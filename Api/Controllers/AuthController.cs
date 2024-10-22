using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Api.JwtConfig;
using Application.Users.Commands;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;

        public AuthController(IConfiguration config)
        {
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(ValidateLoginCommand authenticate)
        {
            var user = (await Mediator.Send(authenticate)).Result;

            if (user != null)
            {
                var token = JwtConfiguration.GenerateToken(user, _config);
                return Ok(new { token, user });
            }

            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("passwordRecovery")]
        public async Task<IActionResult> RecoverPassword(PasswordRecoveryCommand command)
        {
            var result = await Mediator.Send(command);
            return HandleResult(result.Result, result.ErrorProvider);
        }

        [HttpPost("changePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordCommand command)
        {
            var result = await Mediator.Send(command);
            return HandleResult(result.Result, result.ErrorProvider);
        }


    }
}
