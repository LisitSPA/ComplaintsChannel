using Application.Chats.Commands.Creates;
using Application.Chats.Queries;
using Application.Complaints.Commands.Creates;
using Application.Complaints.Commands.Updates;
using Application.Complaints.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
namespace Api.Controllers
{
    [Authorize]
    [Route("api/chat")]
    public class ChatController : ControllerBase
    {
        [AllowAnonymous]
        [HttpGet("{complaintCode}")]
        public async Task<IActionResult> GetByComplaintId(string complaintCode)
        {
            var result = await Mediator.Send(new GetChatByComplaintCodeQuery { code = complaintCode });
            return HandleResult(result.Result, result.ErrorProvider);
        }
                
        [HttpGet("getByUser/{userId}")]
        public async Task<IActionResult> GetByUser(int userId)
        {
            var result = await Mediator.Send(new GetChatByUserQuery { UserId = userId });
            return HandleResult(result.Result, result.ErrorProvider);
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            var result = await Mediator.Send(new GetAllChatsQuery { });
            return HandleResult(result.Result, result.ErrorProvider);
        }

        [AllowAnonymous]
        [HttpPost("", Name = "AddMessage")]
        public async Task<IActionResult> AddMessage([FromForm] CreateMessageChatCommand command)
        {
            var result = await Mediator.Send(command);
            return HandleResult(result.Result, result.ErrorProvider);
        }

    }
}