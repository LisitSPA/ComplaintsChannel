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
using Application.Chats.Queries.DTOs;
using System.Data.Entity;
using System.Collections.Generic;


namespace Application.Chats.Queries;

public record GetChatByComplaintCodeQuery : IRequest<Response<List<ChatDto>>>
{
    public string code { get; init; }
}


//HANDLER
public class GetChatByComplaintCodeQueryHandler(
        IRepository<Chat> _repository,
        IMapper _mapper
    ) : IRequestHandler<GetChatByComplaintCodeQuery, Response<List<ChatDto>>>
{
    public async Task<Response<List<ChatDto>>> Handle(GetChatByComplaintCodeQuery request, CancellationToken cancellationToken)
    {
        Response<List<ChatDto>> result = new();
        try
        {
            var source = _repository.GetAll()
                            .Include(x => x.Complaint)
                            .Include(x => x.User)
                            .Where(x => x.Complaint.TrackingCode == request.code)
                           .ProjectTo<List<ChatDto>>(_mapper.ConfigurationProvider)
                           .FirstOrDefault();

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

