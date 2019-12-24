using DataAccess;
using DataModel;
using DataModel.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Model;
using Services.Helpers;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<LottoSession> _sessionRepository;
        private readonly IRepository<Ticket> _ticketRepository;
        private readonly IRepository<User> _userRepository;
        private readonly IRepository<Bonus> _bonusRepository;
        private readonly IHubContext<NotifyHub> _hubContext;
        private readonly IOptions<AppSettings> _options;


        public UserService(IRepository<LottoSession> sessionRepository,
                             IRepository<Ticket> ticketRepository,
                             IRepository<User> userRepository,
                             IRepository<Bonus> bonusRepository,
                             IHubContext<NotifyHub> hubContext,
                             IOptions<AppSettings> options)
        {
            _sessionRepository = sessionRepository;
            _userRepository = userRepository;
            _ticketRepository = ticketRepository;
            _bonusRepository = bonusRepository;
            _hubContext = hubContext;
            _options = options;
        }
        public TokenModel Authenticate(string username, string password)
        {
            try
            {
                var md5 = new MD5CryptoServiceProvider();
                var md5data = md5.ComputeHash(Encoding.ASCII.GetBytes(password));
                var hashedPassword = Encoding.ASCII.GetString(md5data);

                var user = _userRepository.GetAll().SingleOrDefault(x =>
                    x.UserName == username && x.Password == hashedPassword && x.IsAccountConfirmed == true);


                if (user == null)
                {
                    return null;
                }

                //Create token for the user
                var tokenGenerator = new TokenGenerator();
                var token = tokenGenerator.GenerateToken(user, "User", _options.Value.Secret);
                var newRefreshToken = tokenGenerator.GenerateRefreshToken();
                user.RefreshToken = newRefreshToken;
                _userRepository.Update(user);

                return new TokenModel
                {
                    Token = token,
                    RefreshToken = newRefreshToken
                };
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public TokenModel RefreshToken(string token, string refreshToken)
        {
            try
            {
                var principal = GetPrincipals.GetPrincipalFromExpiredToken(token, _options.Value.Secret);
                var username = principal.Identity.Name;
                var user = _userRepository.GetAll().FirstOrDefault(x => x.UserName == username);
                if (user.RefreshToken != refreshToken)
                    throw new SecurityTokenException("Invalid refresh token");
                var tokenGenerator = new TokenGenerator();
                var newJwtToken = tokenGenerator.GenerateToken(user, "User", _options.Value.Secret);
                var newRefreshToken = tokenGenerator.GenerateRefreshToken();
                user.RefreshToken = newRefreshToken;
                _userRepository.Update(user);
                return new TokenModel()
                {
                    Token = newJwtToken,
                    RefreshToken = newRefreshToken
                };
            }
            catch (Exception ex)
            {

                throw new ApplicationException(ex.Message);
            }

        }

        public void Update(UserModel entity)
        {
            try
            {
                var user = _userRepository.GetAll().SingleOrDefault(x => x.Id == entity.Id);
            
               
                if (entity.UserName != null)
                    user.UserName = entity.UserName;
                if (entity.State != null)
                    user.State = entity.State;
                if (entity.Mobile != null)
                    user.Mobile = entity.Mobile;
                if (entity.DateOfBirth != null)
                    user.DateOfBirth = entity.DateOfBirth;
                if (Enum.TryParse<Gender>(entity.Gender.ToString(), out var gender))
                    user.Gender = entity.Gender.ToEnum<Gender>();
                if (entity.City != null)
                    user.City = entity.City;
                if (entity.CardNumber != 0)
                    user.CardNumber = entity.CardNumber;
                if (entity.CardHolder != null)
                    user.CardHolder = entity.CardHolder;
                if (entity.IsAccountConfirmed)
                    user.IsAccountConfirmed = true;
                _userRepository.Update(user);
   
                _hubContext.Clients.All.SendAsync("notifyAdmins");

            }
            catch (Exception)
            {

                throw new ApplicationException();
            }
            
        }

        public void CreateTicket(TicketModel ticket)
        {
            try
            {
                //Find active session and user owner of the ticket
                var activeSession = _sessionRepository.GetAll().SingleOrDefault(x => x.Active == true);
                var user = _userRepository.GetAll().SingleOrDefault(x => x.Id == ticket.UserId);

                if (!ticket.Numbers.StringToList().CheckTicketNumbers()) throw new ApplicationException("Ticket is not in valid format");

                //Create new ticket
                Ticket newTicket = new Ticket()
                {
                    Numbers = ticket.Numbers,
                    Session = activeSession,
                    SessionId = activeSession.Id,
                    UserId = ticket.UserId,
                    Active = true
                };

                _ticketRepository.Create(newTicket);
                _hubContext.Clients.All.SendAsync("notifyAdmins");
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
           
        }

        public UserPaginationModel GetAllUsers(int take)
        {
            int limit = 10;
            int offset = (take - 1) * limit;
            int usersLength = _userRepository.GetAll().Count();
            List<UserModel> users = new List<UserModel>();
            var allUsers = _userRepository.GetAll().ToList();
            foreach (var user in allUsers)
            {
                //Mapping User to user model with static method
                UserModel model = user.UserToUserModel();
                users.Add(model);
            }

            return new UserPaginationModel()
            {
                Users = users,
                UsersLength = usersLength
            };
        }

        public WinnerPaginationModel GetAllWinners(int page, string filter,string userName)
        {
            int limit = 10;
            int offset = (page - 1) * limit;
            int winningTicketsLength;
            IEnumerable<Ticket> winningTickets;
            var winnersFilter = filter.ToEnum<WinnersFilter>();
        
           //Case there is no filter by userName
            if (userName == "")
            {
                //Fiter winners by prize
                switch (winnersFilter)
                {
                    case WinnersFilter.All:
                        winningTicketsLength = _ticketRepository.GetAll().Where(x => x.Win == true).Count();
                        winningTickets = _ticketRepository.GetAll().Where(x => x.Win == true).OrderByDescending(x => x.SessionId).Skip(offset).Take(limit);
                        break;
                    case WinnersFilter.GiftCard50 :
                        winningTicketsLength = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.GiftCard50).Count();
                        winningTickets = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.GiftCard50).OrderByDescending(x => x.SessionId).Skip(offset).Take(limit);
                        break;
                    case WinnersFilter.GiftCard100 :
                        winningTicketsLength = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.GiftCard100).Count();
                        winningTickets = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.GiftCard100).OrderByDescending(x => x.SessionId).Skip(offset).Take(limit);
                        break;
                    case WinnersFilter.TV :
                        winningTicketsLength = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.TV).Count();
                        winningTickets = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.TV).OrderByDescending(x => x.SessionId).Skip(offset).Take(limit);
                        break;
                    case WinnersFilter.Vacation :
                        winningTicketsLength = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.Vacation).Count();
                        winningTickets = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.Vacation).OrderByDescending(x => x.SessionId).Skip(offset).Take(limit);
                        break;
                    case WinnersFilter.Car :
                        winningTicketsLength = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.Car).Count();
                        winningTickets = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.Car).OrderByDescending(x => x.SessionId).Skip(offset).Take(limit);
                        break;
                    default:
                        throw new ApplicationException("There is no such winners filter");
                }

            }
            
            else
            {
               //Filter winners by userName
                switch (winnersFilter)
                {
                    case WinnersFilter.All :
                        var user = _userRepository.GetAll().Where(x => x.UserName.Contains(userName));
                        winningTicketsLength = _ticketRepository.GetAll().Where(x => x.Win == true && user.Contains(x.User)).Count();
                        winningTickets = _ticketRepository.GetAll().Where(x => x.Win == true && user.Contains(x.User)).OrderByDescending(x => x.SessionId).Skip(offset).Take(limit);
                        break;
                    case WinnersFilter.GiftCard50 :
                        user = _userRepository.GetAll().Where(x => x.UserName.Contains(userName));
                        winningTicketsLength = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.GiftCard50 && user.Contains(x.User)).Count();
                        winningTickets = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.GiftCard50 && user.Contains(x.User)).OrderByDescending(x => x.SessionId).Skip(offset).Take(limit);
                        break;
                    case WinnersFilter.GiftCard100 :
                        user = _userRepository.GetAll().Where(x => x.UserName.Contains(userName));
                        winningTicketsLength = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.GiftCard100 && user.Contains(x.User)).Count();
                        winningTickets = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.GiftCard100 && user.Contains(x.User)).OrderByDescending(x => x.SessionId).Skip(offset).Take(limit);
                        break;
                    case WinnersFilter.TV :
                        user = _userRepository.GetAll().Where(x => x.UserName.Contains(userName));
                        winningTicketsLength = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.TV && user.Contains(x.User)).Count();
                        winningTickets = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.TV && user.Contains(x.User)).OrderByDescending(x => x.SessionId).Skip(offset).Take(limit);
                        break;
                    case WinnersFilter.Vacation :
                        user = _userRepository.GetAll().Where(x => x.UserName.Contains(userName));
                        winningTicketsLength = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.Vacation && user.Contains(x.User)).Count();
                        winningTickets = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.Vacation && user.Contains(x.User)).OrderByDescending(x => x.SessionId).Skip(offset).Take(limit);
                        break;
                    case WinnersFilter.Car :
                        user = _userRepository.GetAll().Where(x => x.UserName.Contains(userName));
                        winningTicketsLength = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.Car && user.Contains(x.User)).Count();
                        winningTickets = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.Car && user.Contains(x.User)).OrderByDescending(x => x.SessionId).Skip(offset).Take(limit);
                        break;
                    default:
                        throw new ApplicationException("There is no such winners filter");
                }
            }
            

            List<WinnerModel> winers = new List<WinnerModel>();

            //Create winnerModel for every ticket with win and put them into List
            foreach (var ticket in winningTickets)
            {
                var user = _userRepository.GetAll().SingleOrDefault(x => x.Id == ticket.UserId);
                var session = _sessionRepository.GetAll().SingleOrDefault(x => x.Id == ticket.SessionId);
                winers.Add(new WinnerModel()
                {
                    WinningNumbers = ticket.Numbers.StringToList(),
                    UserName = user.UserName,
                    Prize = ticket.Prize.ToString(),
                    Matches = (int)ticket.Prize,
                    Session = new LottoSessionModel()
                    {
                        Id = ticket.SessionId,
                        TotalTickets = session.TotalTickets,
                        WinningNumbers = session.WinningNumbers
                    }
                });
            }
            
            //Return winnerPaginationModel with all winners filtered by pagination 
            return new WinnerPaginationModel
            {
                Winners = winers,
                WinnersLength = winningTicketsLength
             };
        }


        public int Register(RegisterModel model)
        {
            try
            {
                var user = _userRepository.GetAll().SingleOrDefault(x => x.UserName == model.Username);

                if (user != null)
                {
                    return 0;
                }

                if (model.Password != model.ConfirmPassword) throw
                        new ApplicationException("Passwords did not match!");

                //Create hashed password
                var md5 = new MD5CryptoServiceProvider();
                var md5data = md5.ComputeHash(Encoding.ASCII.GetBytes(model.Password));
                var hashedPassword = Encoding.ASCII.GetString(md5data);

                var gender = model.Gender.Length > 0 ? model.Gender.ToEnum<Gender>() : Gender.Undifined;

                //Mapping User model to User with static method
                User newUser = model.RegisterModelToUser();
                newUser.Password = hashedPassword;

                ConfirmAccountMail.SendMail(model.Username);

                _hubContext.Clients.All.SendAsync("notifyAdmins");

                return _userRepository.Create(newUser);


            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
           

        }

        public UserModel GetUserByEmailAndPassword(string email, string password)
        {
            var md5 = new MD5CryptoServiceProvider();
            var md5data = md5.ComputeHash(Encoding.ASCII.GetBytes(password));
            var hashedPassword = Encoding.ASCII.GetString(md5data);

            var user = _userRepository.GetAll().SingleOrDefault(x => x.UserName == email && x.Password == hashedPassword);
            if (user == null)
                return null;

            //mapping User to user model with static method
            var userModel = user.UserToUserModel();
            return userModel;

        }

        public List<UserModel> GetAll()
        {
            var users = _userRepository.GetAll().ToList();
            List<UserModel> userModels = new List<UserModel>();
            foreach(var user in users)
            {
                //Mapping User to user model with static method
                UserModel model = user.UserToUserModel();
            
                userModels.Add(model);
            }
            return userModels;
        }

        public bool ConfirmBonus(int id)
        {
            try
            {
                Bonus bonus = _bonusRepository.GetAll().SingleOrDefault(x => x.Id == id);
                User user = _userRepository.GetAll().SingleOrDefault(x => x.Id == bonus.UserId);

                if (bonus.Expiration > DateTime.Now)
                {
                    user.Balance += bonus.Award;
                    _userRepository.Update(user);
                    _bonusRepository.Delete(bonus);
                    return true;
                }

                _bonusRepository.Delete(bonus);
                _hubContext.Clients.All.SendAsync("notifyAdmins");
                _hubContext.Clients.All.SendAsync("notifyUsers");
                return false;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
           
        }


        public UserTicketsModel getAllTicketsByUserId(int userId, int page, string filter)
        {
            int limit = 10;
            int offset = (page - 1) * limit;

            //Find the user
            var user = _userRepository.GetAll().SingleOrDefault(x => x.Id == userId);

            //Converting ticketFilter string to enum with extension method
            var ticketFilter = filter.ToEnum<TicketFilter>();
        
            //Checking if there is any ticket filtering
            if (ticketFilter == TicketFilter.All)
            {
                var ticketsLength = user.Tickets.Count();
                return new UserTicketsModel()
                {
                    Tickets = user.Tickets.OrderByDescending(x => x.SessionId).Skip(offset).Take(limit).ToList().ConvertToTicketModel(),
                    TicketsLength = ticketsLength
                };
            }
                
            else if (ticketFilter == TicketFilter.Active)
            {
                var ticketsLength = user.Tickets.Where(x => x.Active == true).Count();
                return new UserTicketsModel()
                {
                    Tickets = user.Tickets.Where(x => x.Active == true).OrderByDescending(x => x.SessionId).Skip(offset).Take(limit).ToList().ConvertToTicketModel(),
                    TicketsLength = ticketsLength
                };
            }
            else if (ticketFilter == TicketFilter.Win)
            {
                var ticketsLength = user.Tickets.Where(x => x.Win == true).Count();
                return new UserTicketsModel()
                {
                    Tickets = user.Tickets.Where(x => x.Win == true).OrderByDescending(x => x.SessionId).Skip(offset).Take(limit).ToList().ConvertToTicketModel(),
                    TicketsLength = ticketsLength
                };
            }
            throw new ApplicationException("Something went wrong with filtering tickets");
        }

        public int SubscribeUser(string userEmail)
        {
            try
            {
                var user = _userRepository.GetAll().SingleOrDefault(x => x.UserName == userEmail);
                if (user == null) return -1;
                if (user.IsSubscribed) return 0;
                user.IsSubscribed = true;
                _hubContext.Clients.All.SendAsync("notifyAdmins");
                return _userRepository.Update(user);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
           
        }

    
        public int AddCredit (AddCreditModel model)
        {
            try
            {
                var md5 = new MD5CryptoServiceProvider();
                var md5data = md5.ComputeHash(Encoding.ASCII.GetBytes(model.Password));
                var userHashedPassword = Encoding.ASCII.GetString(md5data);

                var player = _userRepository.GetAll().SingleOrDefault(x => x.UserName == model.Email && x.Password == userHashedPassword && x.CardNumber == model.CardNumber && x.CardHolder == model.CardHolder);
                if (player == null) return 0;

                player.Balance += model.Amount;
                _hubContext.Clients.All.SendAsync("notifyAdmins");
                return _userRepository.Update(player);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            
        }
    }
}
