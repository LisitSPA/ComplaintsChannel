using Application.Common.Interfaces;
using Utility.DTOs;
using MediatR;
using Domain.Entities;
using System.Threading.Tasks;
using System.Threading;
using System.Collections.Generic;
using Application.Dashboard.Queries.DTOs;
using System.Linq.Dynamic.Core;
using System.Linq;
using Domain.Enums;



namespace Application.Dashboard.Queries;

public record GetChartByAreaQuery : IRequest<Response<List<ChartDataDto>>>
{
    
}


//HANDLER
public class ChartByAreaQueryHandler(
    IRepository<ComplaintInvolved> _repo
    ) 
    : IRequestHandler<GetChartByAreaQuery, Response<List<ChartDataDto>>>
{

    public async Task<Response<List<ChartDataDto>>> Handle(GetChartByAreaQuery request, CancellationToken cancellationToken)
    {
        Response<List<ChartDataDto>> result = new();
        try
        {
            var source = _repo.GetAll()
                .Where(x => x.PersonInvolved.EUserType != EUserType.Complainant)
                .GroupBy(x => x.PersonInvolved.Area)
                .Select(x => new ChartDataDto
                {
                    Total = x.Count(),
                    Name = x.Key
                })
                .ToList();


            result.Result = source;

            return result;

        }
        catch (System.Exception ex)
        {
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }
        return result;
    }
}

