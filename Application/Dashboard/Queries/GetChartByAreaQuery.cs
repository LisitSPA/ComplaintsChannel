using AutoMapper;
using Application.Common.Interfaces;
using Utility.DTOs;
using MediatR;
using Domain.Entities;
using System.Threading.Tasks;
using System.Threading;
using System.Collections.Generic;
using Application.Complaints.Queries.DTOs;
using Application.Dashboard.Queries.DTOs;
using AutoMapper.QueryableExtensions;
using System.Linq.Dynamic.Core;
using System.Linq;
using Microsoft.EntityFrameworkCore;



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

            var source = _repo.GetAllActive()
                            .Include(x => x.PersonInvolved)
                            .GroupBy(x => x.PersonInvolved.Area)
                            .Select(x => new ChartDataDto
                            {
                                Total = x.Count(),
                                Name = x.First().PersonInvolved.Area
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

