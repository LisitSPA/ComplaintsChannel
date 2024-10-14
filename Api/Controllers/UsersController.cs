using Application.Users.Commands;
using Application.Users.Commands.Creates;
using Application.Users.Commands.Deletions;
using Application.Users.Commands.Updates;
using Application.Users.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Update.Internal;
using System.Threading.Tasks;
namespace Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {

        [HttpGet("all/{language}", Name = "GetAll")]
        public async Task<IActionResult> GetAll(string language)
        {
            var result = await Mediator.Send(new GetAllUsersQueryDE { });
            return HandleResult(result.Result, result.ErrorProvider, language);
        }

        [HttpGet("{id}", Name = "GetUserById")]
        public async Task<IActionResult> GetUserById(int id, string language)
        {
            var result = await Mediator.Send(new GetUserByIdQuery { Id = id });
            return HandleResult(result.Result, result.ErrorProvider, language);
        }

        [HttpPost("", Name = "CreateUser")]
        public async Task<IActionResult> CreateUser(CreateUserCommand command)
        {
            var result = await Mediator.Send(command);
            return HandleResult(result.Result, result.ErrorProvider);
        }

        [HttpPut("", Name = "UpdateUser")]
        public async Task<IActionResult> UpdateUser(UpdateUserCommand command)
        {
            var result = await Mediator.Send(command);
            return HandleResult(result.Result, result.ErrorProvider);
        }

        [HttpDelete("", Name = "DeleteUser")]
        public async Task<IActionResult> DeleteUser(DeleteUserCommand command)
        {
            var result = await Mediator.Send(command);
            return HandleResult(result.Result, result.ErrorProvider);
        }
    }
}