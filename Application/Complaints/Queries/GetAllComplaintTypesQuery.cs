using AutoMapper;
using Application.Common.Interfaces;
using Utility.DTOs;
using MediatR;
using Domain.Entities;
using System.Threading.Tasks;
using System.Threading;
using System.Linq;
using AutoMapper.QueryableExtensions;
using System.Collections.Generic;
using Application.Complaints.Queries.DTOs;
using Application.Translator;


namespace Application.Complaints.Queries;

public record GetAllComplaintTypesQuery : IRequest<Response<List<ComplaintTypeDto>>>
{
    public string languaje { get; init; }
}


//HANDLER
public class GetAllComplaintTypesQueryHandler
    (
        IRepository<ComplaintType> _repo, 
        IMapper _mapper,
        IAzureTranslatorService _translatorService
     ) : IRequestHandler<GetAllComplaintTypesQuery, Response<List<ComplaintTypeDto>>>
{

    public async Task<Response<List<ComplaintTypeDto>>> Handle(GetAllComplaintTypesQuery request, CancellationToken cancellationToken)
    {
        Response<List<ComplaintTypeDto>> result = new();
        try
        {

            var source = _repo.GetAllActive()
                           .ProjectTo<ComplaintTypeDto>(_mapper.ConfigurationProvider)
                           .ToList();

            if (request.languaje != "es")
                source.ForEach(x =>
                {
                    x.Description = _translatorService.Translate(x.Description, request.languaje).Result;
                });

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

