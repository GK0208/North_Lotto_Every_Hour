using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Services;
using Services.Helpers;

namespace LottoApi.Controllers
{
    [Authorize(Roles = "User")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAdminService _adminService;
        public UserController(IUserService userService, IAdminService adminService)
        {
            _userService = userService;
            _adminService = adminService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] LoginModel model)
        {
            try
            {
                var user = _userService.Authenticate(model.Username, model.Password);

                if (user == null)
                {
                    return NotFound(new ResponseMessage() { Message = "Username or Password is incorrect!" });
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            };
        }

        [HttpGet("getProfile")]
        public IActionResult GetProfile()
        {
            try
            {
                var userId = GetAuthorizedUserId();
                var user = _userService.GetAll().SingleOrDefault(x => x.Id == userId && x.IsAccountConfirmed == true);


                if (user == null)
                {
                    return NotFound(new ResponseMessage() { Message = "No such user !" });
                }


                return Ok(user);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            };
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterModel model)
        {
            try
            {
                var user = _userService.GetAll().SingleOrDefault(x => x.UserName == model.Username);
                if (user != null)
                {
                    return BadRequest(new ResponseMessage(){ Message = $"{model.Username} already exists !" });
                }
                _userService.Register(model);
                return Ok(new ResponseMessage(){ Message = "Plase check your email and confirm your account" });
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }

        }

        [AllowAnonymous]
        [HttpPost("emailConfirmation")]
        public IActionResult EmailConfirmation([FromBody] ConfirmAcountModel model)
        {

            try
            {
                var user = _userService.GetUserByEmailAndPassword(model.Email, model.Password);

                if (user == null)
                {
                    return BadRequest(new ResponseMessage(){ Message = $"Inputs for {model.Email} are incorrect !" });
                }

                if (user.IsAccountConfirmed == true)
                {
                    return BadRequest(new ResponseMessage(){ Message = $"{model.Email} is already confirmed " });
                }

                user.IsAccountConfirmed = true;
                _userService.Update(user);
                return Ok(new ResponseMessage() { Message = "Account succesfully confirmed" });
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }

        }


        [HttpPost("createTicket")]
        public IActionResult CreateTicket([FromBody] TicketModel model)
        {
            try
            {
                model.UserId = GetAuthorizedUserId();
                var user = _userService.GetAll().SingleOrDefault(x => x.Id == model.UserId);
                if (user.Balance < 5) return BadRequest(new ResponseMessage() { Message = "You dont have enough credit" });

                //Check if ticket is in valid format with extension method
                var ticketCheck = model.Numbers.StringToList().CheckTicketNumbers();
                if (!ticketCheck) return BadRequest(new ResponseMessage(){ Message = "Ticket is not in correct format " });

                _userService.CreateTicket(model);

                var updatedUser = _userService.GetAll().SingleOrDefault(x => x.Id == model.UserId);
                if (updatedUser.TicketsLength > 0 && updatedUser.TicketsLength % 10 == 0)
                {
                    _adminService.GiveUserBonus(updatedUser);
                    return Ok(new ResponseMessage(){ Message = $"Congratilations this is your {updatedUser.TicketsLength} ticket, you have additional bonus of 5$. Please go to Bonuses section and confirm it !" });
                }
                return Ok(new ResponseMessage(){ Message = "Ticket was successfully registered in database" });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
                
            }

        }

        [HttpGet("winners")]
        public IActionResult GetWinners(int page, string filter, string userInput)
        {
            try
            {
                userInput = userInput ?? "";
                var winners = _userService.GetAllWinners(page, filter, userInput);

                return Ok(winners);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        [HttpGet("tickets")]
        public UserTicketsModel GetAllTickets(int page, string filter)
        {
            var userId = GetAuthorizedUserId();
            return _userService.getAllTicketsByUserId(userId, page, filter);

        }


        [HttpPost("updateUser")]
        public IActionResult UpdateUser(UserModel userModel)
        {

            try
            {
                var userId = GetAuthorizedUserId();
                var user = _userService.GetAll().SingleOrDefault(x => x.Id == userId);

                if (user == null)
                {
                    return NotFound();
                }

                userModel.Id = userId;
                _userService.Update(userModel);

                return Ok(new ResponseMessage() { Message = "Update was successfull" });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }


        }

        [HttpPost("addCredit")]
        public IActionResult AddCredit(AddCreditModel model)
        {
            try
            {
                var result = _userService.AddCredit(model);
                if (result == 0) return NotFound(new ResponseMessage(){ Message = "Some of the inputs are incorrect " });
                return Ok(new ResponseMessage(){ Message = $"{model.Amount} $ has been added to your account " });
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }

        }

        [HttpPost("subscribeUser")]
        public IActionResult Subscribe([FromBody] string email)
        {
            var subscriber = _userService.SubscribeUser(email);

            if (subscriber == -1) return NotFound(new ResponseMessage(){ Message = $"There is no {email} in our system " });
            if (subscriber == 0) return BadRequest(new ResponseMessage(){ Message = $"{email} has been already subscribed" });

            return Ok(new ResponseMessage(){ Message = $"{email} has been successfully subscribed" });
        }

        [HttpPost("confirmBonus")]
        public IActionResult ConfirmBonus([FromQuery] int id)
        {
            try
            {
                var result = _userService.ConfirmBonus(id);
                if (!result) return Ok(new ResponseMessage(){ Message = "Bonus has expired" });
                return Ok(new ResponseMessage(){ Message = "Congrats! Your balance has been updated" });
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost("refreshUserToken")]
        public TokenModel RefreshToken([FromBody] TokenModel model)
        {
            return _userService.RefreshToken(model.Token, model.RefreshToken);
        }


        private int GetAuthorizedUserId()
        {
            if (!int.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?
                .Value, out var userId))
            {
                string name = User.FindFirst(ClaimTypes.Name)?.Value;
                throw new Exception($"{name} identifier claim does not exist!");
            }
            return userId;
        }
    }
}