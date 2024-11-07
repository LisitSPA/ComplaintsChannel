using AutoMapper;
using Application.Common.Interfaces;
using Utility.DTOs;
using MediatR;
using Domain.Entities;
using System.Threading.Tasks;
using System.Threading;
using System.Linq;
using AutoMapper.QueryableExtensions;
using Application.Complaints.Queries.DTOs;
using Microsoft.EntityFrameworkCore;
using Application.Configuration.Queries.DTOs;
using System.Drawing;


namespace Application.Configuration.Queries;

public record GetConfiguration : IRequest<Response<ConfigurationDto>>
{
  
}


//HANDLER
public class GetComplaintByCodeQueryHandler : IRequestHandler<GetConfiguration, Response<ConfigurationDto>>
{
    private readonly IRepository<Parameters> _repository;
    private readonly IMapper _mapper;

    public GetComplaintByCodeQueryHandler(IRepository<Parameters> repo, IMapper mapper)
    {
        _repository = repo;
        _mapper = mapper;
    }

    public async Task<Response<ConfigurationDto>> Handle(GetConfiguration request, CancellationToken cancellationToken)
    {
        Response<ConfigurationDto> result = new();
        try
        {
            var data = _repository.GetAll()
                .Where(x => x.Code == "Logo" || x.Code == "Color")
                .ToList();

            var source = new ConfigurationDto
            {
                Logo = data.FirstOrDefault(x => x.Code == "Logo")?.TextValue,
                Color = data.FirstOrDefault(x => x.Code == "Color")?.TextValue,
            };

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

