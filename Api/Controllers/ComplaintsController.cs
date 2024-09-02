using Application.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
namespace Api.Controllers
{
    [ApiController]
    [Route("api/complaints")]
    public class ComplaintsController: ComplaintControllerBase
    {
        [HttpGet("types/all", Name = "GetAllComplaintTypes")]
        public async Task<IActionResult> GetAllComplaintTypes()
        {
            var result = await Mediator.Send(new GetAllComplaintTypesQuery {});
            return HandleResult(result.Result, result.ErrorProvider);
        }

    }
}