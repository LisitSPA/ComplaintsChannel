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
        [HttpGet("All", Name = "GetJComplaints")]
        public async Task<IActionResult> GetJourney()
        {
            var result = await Mediator.Send(new GetAllComplaintsQuery {});
            return HandleResult(result.Result, result.ErrorProvider);
        }

    }
}