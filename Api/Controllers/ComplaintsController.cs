using Application.Chats.Commands.Creates;
using Application.Complaints.Commands.Creates;
using Application.Complaints.Commands.Updates;
using Application.Complaints.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
namespace Api.Controllers
{
    [ApiController]
    [Route("api/complaints")]
    public class ComplaintsController: ControllerBase
    {
        [HttpGet("types/all", Name = "GetAllComplaintTypes")]
        public async Task<IActionResult> GetAllComplaintTypes()
        {
            var result = await Mediator.Send(new GetAllComplaintTypesQuery {});
            return HandleResult(result.Result, result.ErrorProvider);
        }

        [HttpGet("{code}", Name = "GetComplaintByCode")]
        public async Task<IActionResult> GetComplaintByCode(string code)
        {
            var result = await Mediator.Send(new GetComplaintByCodeQuery { code = code});
            return HandleResult(result.Result, result.ErrorProvider);
        }

        [HttpPost("", Name = "CreateComplaint")]
        public async Task<IActionResult> CreateComplaint(CreateComplaintCommand command)
        {
            var result = await Mediator.Send(command);
            return HandleResult(result.Result, result.ErrorProvider);
        }

        [HttpPost("attachments", Name = "AddAttachments")]
        public async Task<IActionResult> AddAttachments([FromForm]AddAttachmentsCommand command)
        {
            var result = await Mediator.Send(command);
            return HandleResult(result.Result, result.ErrorProvider);
        }
        
        [HttpPut("", Name = "UpdateStatusComplaint")]
        public async Task<IActionResult> UpdateComplaint(UpdateComplaintStatusCommand command)
        {
            var result = await Mediator.Send(command);
            return HandleResult(result.Result, result.ErrorProvider);
        }
    }
}