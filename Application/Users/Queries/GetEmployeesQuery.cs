using AutoMapper;
using Application.Common.Interfaces;
using Utility.DTOs;
using MediatR;
using Domain.Entities;
using System.Threading.Tasks;
using System.Threading;
using System.Linq;
using System.Data.Entity;
using AutoMapper.QueryableExtensions;
using Application.Users.Queries.DTOs;
using System.Collections.Generic;



namespace Application.Users.Queries;

public record GetEmployeesQuery : IRequest<Response<List<PublicEmployeeDto>>>
{
}


//HANDLER
public class GetEmployeesQueryHandler(
    IRepository<User> _repo,
    IMapper _mapper
    ) : IRequestHandler<GetEmployeesQuery, Response<List<PublicEmployeeDto>>>
{

    public async Task<Response<List<PublicEmployeeDto>>> Handle(GetEmployeesQuery request, CancellationToken cancellationToken)
    {
        Response<List<PublicEmployeeDto>> result = new();
        try
        {
            var data = _repo.GetAllActive()
                .AsNoTracking()
                .Where(x => 
                    !x.Deleted 
                    && x.EUserType != Domain.Enums.EUserType.Complainant
                    && x.ECompanyStatus == Domain.Enums.ECompanyStatus.Active)
                .ProjectTo<PublicEmployeeDto>(_mapper.ConfigurationProvider)
                .OrderBy(x => x.Names)
                .ToList();

            result.Result = data;

            return result;

        }
        catch (System.Exception ex)
        {
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }
        return result;
    }
}

