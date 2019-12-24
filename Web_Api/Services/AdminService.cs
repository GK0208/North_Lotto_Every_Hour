using DataAccess;
using DataModel;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using DataModel.LottoHelpers;
using Services.Helpers;
using DataModel.Enums;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using Microsoft.AspNetCore.SignalR;

namespace Services
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IRepository<LottoSession> _sessionRepository;
        private readonly IRepository<Ticket> _ticketRepository;
        private readonly IRepository<User> _userRepository;
        private readonly IRepository<Bonus> _bonusRepository;
        private readonly IOptions<AppSettings> _options;
        private readonly IHubContext<NotifyHub> _hubContext;

        public AdminService(IAdminRepository adminRepository,
                             IRepository<LottoSession> sessionRepository,
                             IRepository<Ticket> ticketRepository,
                             IRepository<Bonus> bonusRepository,
                             IRepository<User> userRepository,
                             IHubContext<NotifyHub> hubContext,
                             IOptions<AppSettings> options)


        {
            _adminRepository = adminRepository;
            _sessionRepository = sessionRepository;
            _userRepository = userRepository;
            _ticketRepository = ticketRepository;
            _bonusRepository = bonusRepository;
            _hubContext = hubContext;
            _options = options;
           
        }
        public object Authenticate(string username, string password)
        {
            // Create hashed password
            var md5 = new MD5CryptoServiceProvider();
            var md5data = md5.ComputeHash(Encoding.ASCII.GetBytes(password));
            var hashedPassword = Encoding.ASCII.GetString(md5data);

            //Finding admin with such username and password
            var admin = _adminRepository.GetAll().SingleOrDefault(x =>
                x.UserName == username && x.Password == hashedPassword);

            if (admin == null)
            {
                return null;
            }

            //Creating JWT Token for admin
            var tokenGenerator = new TokenGenerator();
            var token = tokenGenerator.GenerateToken(admin, "Admin", _options.Value.Secret);
            var newRefreshToken = tokenGenerator.GenerateRefreshToken();
            admin.RefreshToken = newRefreshToken;
            _adminRepository.Update(admin);

            return new TokenModel
            {
                Token = token,
                RefreshToken = newRefreshToken
            };
        }

        public TokenModel RefreshToken(string token, string refreshToken)
        {
            try
            {
                var principal = GetPrincipals.GetPrincipalFromExpiredToken(token, _options.Value.Secret);
                var username = principal.Identity.Name;
                var admin = _adminRepository.GetAll().FirstOrDefault(x => x.UserName == username);
                if (admin.RefreshToken != refreshToken)
                    throw new SecurityTokenException("Invalid refresh token");
                var tokenGenerator = new TokenGenerator();
                var newJwtToken = tokenGenerator.GenerateToken(admin, "Admin", _options.Value.Secret);
                var newRefreshToken = tokenGenerator.GenerateRefreshToken();
                admin.RefreshToken = newRefreshToken;
                _adminRepository.Update(admin);

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

        

        public void CreateSession(AdminModel model)
        {
            try
            {
                //Create hashed password
                var md5 = new MD5CryptoServiceProvider();
                var md5data = md5.ComputeHash(Encoding.ASCII.GetBytes(model.Password));
                var hashedPassword = Encoding.ASCII.GetString(md5data);

                //Find admin with such username and password
                var admin = _adminRepository.GetAll().SingleOrDefault(x => x.Id == model.Id && x.UserName == model.UserName && x.Password == hashedPassword);
                if (admin == null) throw new Exception("There is no such admin to create new session");

                //Create new Lotto Session
                var lottoSession = new LottoSession()
                {
                    Active = true,
                    AdminId = admin.Id,
                    Admin = admin,
                    CreatedAt = DateTime.Now
                };

                _sessionRepository.Create(lottoSession);
                admin.Sessions.Add(lottoSession);
                _adminRepository.Update(admin);
                _hubContext.Clients.All.SendAsync("alertUsers");
                _hubContext.Clients.All.SendAsync("notifyAdmins");
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
           

        }

        public WinnerPaginationModel GetAllWinners(int page, string filter, string userName)
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
                    case WinnersFilter.GiftCard50:
                        winningTicketsLength = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.GiftCard50).Count();
                        winningTickets = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.GiftCard50).OrderByDescending(x => x.SessionId).Skip(offset).Take(limit);
                        break;
                    case WinnersFilter.GiftCard100:
                        winningTicketsLength = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.GiftCard100).Count();
                        winningTickets = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.GiftCard100).OrderByDescending(x => x.SessionId).Skip(offset).Take(limit);
                        break;
                    case WinnersFilter.TV:
                        winningTicketsLength = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.TV).Count();
                        winningTickets = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.TV).OrderByDescending(x => x.SessionId).Skip(offset).Take(limit);
                        break;
                    case WinnersFilter.Vacation:
                        winningTicketsLength = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.Vacation).Count();
                        winningTickets = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.Vacation).OrderByDescending(x => x.SessionId).Skip(offset).Take(limit);
                        break;
                    case WinnersFilter.Car:
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
                    case WinnersFilter.All:
                        var user = _userRepository.GetAll().Where(x => x.UserName.Contains(userName));
                        winningTicketsLength = _ticketRepository.GetAll().Where(x => x.Win == true && user.Contains(x.User)).Count();
                        winningTickets = _ticketRepository.GetAll().Where(x => x.Win == true && user.Contains(x.User)).OrderByDescending(x => x.SessionId).Skip(offset).Take(limit);
                        break;
                    case WinnersFilter.GiftCard50:
                        user = _userRepository.GetAll().Where(x => x.UserName.Contains(userName));
                        winningTicketsLength = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.GiftCard50 && user.Contains(x.User)).Count();
                        winningTickets = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.GiftCard50 && user.Contains(x.User)).OrderByDescending(x => x.SessionId).Skip(offset).Take(limit);
                        break;
                    case WinnersFilter.GiftCard100:
                        user = _userRepository.GetAll().Where(x => x.UserName.Contains(userName));
                        winningTicketsLength = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.GiftCard100 && user.Contains(x.User)).Count();
                        winningTickets = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.GiftCard100 && user.Contains(x.User)).OrderByDescending(x => x.SessionId).Skip(offset).Take(limit);
                        break;
                    case WinnersFilter.TV:
                        user = _userRepository.GetAll().Where(x => x.UserName.Contains(userName));
                        winningTicketsLength = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.TV && user.Contains(x.User)).Count();
                        winningTickets = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.TV && user.Contains(x.User)).OrderByDescending(x => x.SessionId).Skip(offset).Take(limit);
                        break;
                    case WinnersFilter.Vacation:
                        user = _userRepository.GetAll().Where(x => x.UserName.Contains(userName));
                        winningTicketsLength = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.Vacation && user.Contains(x.User)).Count();
                        winningTickets = _ticketRepository.GetAll().Where(x => x.Win == true && x.Prize == Prize.Vacation && user.Contains(x.User)).OrderByDescending(x => x.SessionId).Skip(offset).Take(limit);
                        break;
                    case WinnersFilter.Car:
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

        public void Register(RegisterModel model)
        {
            if (model.Password != model.ConfirmPassword) throw
                    new Exception("Passwords did not match!");

            //Create hashed password
            var md5 = new MD5CryptoServiceProvider();
            var md5data = md5.ComputeHash(Encoding.ASCII.GetBytes(model.Password));
            var hashedPassword = Encoding.ASCII.GetString(md5data);

            //Create new Admin
            var admin = new Admin()
            {
                UserName = model.Username,
                Password = hashedPassword
            };

        }

        public void GiveUserAdminAccess(UserModel model)
        {
            try
            {
                var user = _userRepository.GetAll().SingleOrDefault(x => x.Id == model.Id);
                _adminRepository.GiveUserAdminPermision(user);
            }
            catch (Exception)
            {

                throw;
            }           
        }

        public void StartDraw(int adminId)
        {
            try
            {
                // Find the only one active session
                var activeSession = _sessionRepository.GetAll().SingleOrDefault(x => x.Active == true);

                if (activeSession == null)
                {
                    throw new NullReferenceException("THERE IS NO ACTIVE SESSION AT THE MOMENT");
                }

                //Set that session to not Active
                activeSession.Active = false;

                //Getting all tickets from the session
                var tickets = _ticketRepository.GetAll().Where(x => x.SessionId == activeSession.Id).ToList();

                //Initialize the draw
                Random rnd = new Random();
                List<int> winningNumbers = new List<int>();
                for (int i = 0; i < 7; i++)
                {
                    var number = (rnd.Next(1, 36));
                    if (winningNumbers.Contains(number))
                    {
                        i--;
                        continue;
                    };
                    winningNumbers.Add(number);
                }

                //Set the winning numbers to the session
                activeSession.WinningNumbers = string.Join(", ", winningNumbers);

                //Set awards to the tickets
                for (int i = 0; i < tickets.Count; i++)
                {
                    //Check number of matces with extension method
                    int ticketStatus = tickets[i].Numbers.StringToList().CheckTicketStatus(winningNumbers);
                    tickets[i].Active = false;
                    if (ticketStatus > 2)
                    {
                        //Get ticket award if matches are more then 2 with extension method
                        var award = tickets[i].GetAward(ticketStatus);
                        tickets[i].Win = true;
                        tickets[i].Prize = award;
                        _ticketRepository.Update(tickets[i]);
                    }
                };

                _sessionRepository.Update(activeSession);

                //Create new Session
                var lottoSession = new LottoSession()
                {
                    Active = true,
                    AdminId = adminId,
                    Admin = activeSession.Admin,
                    CreatedAt = DateTime.Now
                };

                _sessionRepository.Create(lottoSession);

                //Code for creating excel files with tickets and winners
                var lastSession = _sessionRepository.GetAll().Where(x => x.Active == false).Last();
                var winningTickets = _ticketRepository.GetAll().Where(x => x.Win == true && x.SessionId == lastSession.Id).ToList();

                foreach (var ticket in winningTickets)
                {
                    var user = _userRepository.GetAll().SingleOrDefault(x => x.Id == ticket.UserId);
                    switch (ticket.Prize)
                    {
                        case Prize.GiftCard50:
                            user.Balance += 10;
                            break;
                        case Prize.GiftCard100:
                            user.Balance += 100;
                            break;
                        case Prize.TV:
                            user.Balance += 1000;
                            break;
                        case Prize.Vacation:
                            user.Balance += 10_000;
                            break;
                        case Prize.Car:
                            user.Balance += 1_000_000;
                            break;
                        default:
                            return;
                    }
                    _userRepository.Update(user);


                }

                DateTime dateTime = DateTime.Today;
                string date = dateTime.ToString("dd/MM/yyyy");

                if (lastSession.TotalTickets > 0)
                    WriteToExcell.WriteExcelFile(lastSession.Tickets.ToList().ConvertToTicketModel(), $"SessionResultsStorage/All_Tickets_For_Session_{lastSession.Id}_{date}");

                var users = _userRepository.GetAll().Where(x => x.IsSubscribed == true).Select(user => user.UserName).ToList();

                if (users.Count > 0)
                   Mailer.SendMail(users, activeSession);
                _hubContext.Clients.All.SendAsync("alertUsers");
                _hubContext.Clients.All.SendAsync("notifyAdmins");
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            
        }

        public List<Admin> GetAll()
        {
            return _adminRepository.GetAll().ToList();
        }

        public AdminModel GetAdminById(int id)
        {
            var admin = _adminRepository.GetAll().SingleOrDefault(x => x.Id == id);
            var adminSessions = _sessionRepository.GetAll().Where(x => x.AdminId == admin.Id);
            List<LottoSessionModel> adminSessionsModel = new List<LottoSessionModel>();
            foreach(var session in adminSessions)
            {
                //Mapping Session to Session Model with static method
                var sessionModel = session.LottoSessionToSessionModel();
                adminSessionsModel.Add(sessionModel);
            }

            //Mapping Admin to admin model with static method
            var adminModel = admin.AdminToAdminModel();
            adminModel.Sessions = adminSessionsModel;
      
            return adminModel;
        }

        public void Update(AdminModel entity)
        {
            try
            {
                var admin = _adminRepository.GetAll().SingleOrDefault(x => x.Id == entity.Id);


                if (entity.UserName != null)
                    admin.UserName = entity.UserName;
                if (entity.State != null)
                    admin.State = entity.State;
                if (entity.Mobile != null)
                    admin.Mobile = entity.Mobile;
                if (entity.DateOfBirth != null)
                    admin.DateOfBirth = entity.DateOfBirth;
                if (Enum.TryParse<Gender>(entity.Gender.ToString(), out var gender))
                    admin.Gender = entity.Gender.ToEnum<Gender>();
                if (entity.City != null)
                    admin.City = entity.City;

                _adminRepository.Update(admin);

            }
            catch (Exception)
            {

                throw new ApplicationException();
            }

        }

        public void GiveUserBonus(UserModel model)
        {
            try
            {
                var user = _userRepository.GetAll().SingleOrDefault(x => x.Id == model.Id);

                Bonus bonus = new Bonus()
                {
                    Award = 5,
                    UserId = user.Id,
                    User = user,
                    Expiration = DateTime.Now.AddDays(7)
                };
                _bonusRepository.Create(bonus);
                _hubContext.Clients.All.SendAsync("notifyUsers");

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
            
        }
    }
}
