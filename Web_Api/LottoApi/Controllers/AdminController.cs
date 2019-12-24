using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Model;
using Services;

namespace LottoApi.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;
        private readonly IUserService _userService;

        public AdminController(IAdminService adminService,IUserService userService)
        {
            _adminService = adminService;
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] LoginModel model)
        {
            var admin = _adminService.Authenticate(model.Username, model.Password);

            if (admin == null)
            {
                return NotFound(new ResponseMessage() { Message = "Username or Password is incorrect!" });
            }

            return Ok(admin);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterModel model)
        {
            _adminService.Register(model);
            return Ok();
        }

        [HttpPost("startSession")]
        public IActionResult StartSession([FromBody] AdminModel model)
        {
            _adminService.CreateSession(model);
            return Ok();
        }

        [HttpPost("confirmAdmin")]
        public IActionResult GiveUserAdminAccess([FromBody] UserModel model)
        {
            try
            {
                _adminService.GiveUserAdminAccess(model);
                var response = new ResponseMessage()
                {
                    Message = "Your confirmation has been successfull"
                };
                return Ok(response);
            }
            catch (Exception)
            {
                var response = new ResponseMessage()
                {
                    Message = "Ooops something went wrong, please try again later !"
                };
                return BadRequest(response);
            }
        }

        [HttpGet("winners")]
        public WinnerPaginationModel GetWinners(int page, string filter, string userInput)
        {

            try
            {
                userInput = userInput ?? "";
                var winners = _adminService.GetAllWinners(page, filter, userInput);

                return winners;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        [HttpPost("startDraw")]
        public IActionResult StartDraw()
        {
            try
            {
                var adminId = GetAuthorizedUserId();
                _adminService.StartDraw(adminId);

                return Ok(new ResponseMessage() { Message = "Draw successfully started" });
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
           
        }

        [HttpGet("getProfile")]
        public IActionResult GetProfile()
        {
            try
            {
                var adminId = GetAuthorizedUserId();
                var admin = _adminService.GetAdminById(adminId);
                

                if (admin == null)
                {
                    return NotFound();
                }

                return Ok(admin);
            }
            catch (ApplicationException ex)
            {
                throw new ApplicationException(ex.Message);
            };
        }

        [HttpGet("getUsers")]
        public IActionResult GetUsers([FromQuery] int take)
        {
            try
            {
               var result = _userService.GetAllUsers(take);

                return Ok(result);
            }
            catch (ApplicationException ex)
            {
                throw new ApplicationException(ex.Message);
            };
        }

        [HttpPost("updateAdmin")]
        public IActionResult UpdateAdmin(AdminModel adminModel)
        {

            try
            {
                var adminId = GetAuthorizedUserId();
                var admin = _adminService.GetAll().SingleOrDefault(x => x.Id == adminId);

                if (admin == null)
                {
                    return NotFound();
                }

                adminModel.Id = adminId;
                _adminService.Update(adminModel);
                var response = new ResponseMessage()
                {
                    Message = "Profile updated succesfully"
                };
                return Ok(response);
            }
            catch (Exception)
            {
                var response = new ResponseMessage()
                {
                    Message = "Oopss, something went wrong, please try again !"
                };
                return BadRequest(response);
            }
        }

        [AllowAnonymous]
        [HttpPost("refreshAdminToken")]
        public TokenModel RefreshToken([FromBody] TokenModel model)
        {
            return _adminService.RefreshToken(model.Token, model.RefreshToken);
        }

        private int GetAuthorizedUserId()
        {
            if (!int.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?
                .Value, out var userId))
            {
                string name = User.FindFirst(ClaimTypes.Name)?.Value;
                throw new Exception("Name identifier claim does not exist!");
            }
            return userId;
        }

        
    }
}