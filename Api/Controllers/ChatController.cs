using Application.Chats.Commands.Creates;
using Application.Chats.Queries;
using Application.Complaints.Commands.Creates;
using Application.Complaints.Commands.Updates;
using Application.Complaints.Queries;
using Application.Translator;
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
        private IAzureTranslatorService _translatorService;

        [AllowAnonymous]
        [HttpGet("{complaintCode}/{language}")]
        public async Task<IActionResult> GetByComplaintId(string complaintCode, string language)
        {
            var result = await Mediator.Send(new GetChatByComplaintCodeQuery { code = complaintCode });
            return HandleResult(result.Result, result.ErrorProvider, language);
        }

        [HttpGet("getByUser/{userId}/{language}")]
        public async Task<IActionResult> GetByUser(int userId, string language)
        {
            var result = await Mediator.Send(new GetChatByUserQuery { UserId = userId });
            return HandleResult(result.Result, result.ErrorProvider, language);
        }

        [HttpGet("getAll/{language}")]
        public async Task<IActionResult> GetAll(string language)
        {
            var result = await Mediator.Send(new GetAllChatsQuery { });
            return HandleResult(result.Result, result.ErrorProvider, language);
        }


        [HttpGet("getByComplaintId/{complaintId}/{language}")]
        public async Task<IActionResult> GetAll(int complaintId, string language)
        {
            var result = await Mediator.Send(new GetChatByComplaintIdQuery {complaintId = complaintId });
            return HandleResult(result.Result, result.ErrorProvider, language);
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