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
using System.Collections.Generic;


namespace Application.Chats.Queries;

public record GetChatByComplaintIdQuery : IRequest<Response<List<ChatDto>>>
{
    public int complaintId { get; init; }
}


//HANDLER
public class GetChatByComplaintIdQueryHandler(
        IRepository<Chat> _repository,
        IMapper _mapper
    ) : IRequestHandler<GetChatByComplaintIdQuery, Response<List<ChatDto>>>
{
    public async Task<Response<List<ChatDto>>> Handle(GetChatByComplaintIdQuery request, CancellationToken cancellationToken)
    {
        Response<List<ChatDto>> result = new();
        try
        {
            var source = _repository.GetAll()
                            .Where(x => x.ComplaintId == request.complaintId)
                           .ProjectTo<ChatDto>(_mapper.ConfigurationProvider)
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

