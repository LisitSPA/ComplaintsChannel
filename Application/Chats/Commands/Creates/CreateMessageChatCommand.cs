using Application.Common.Interfaces;
using Application.Complaints.Commands.Creates;
using Application.Complaints.Queries.DTOs;
using Application.Notifications;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading;
using System.Threading.Tasks;
using Utility.DTOs;

namespace Application.Chats.Commands.Creates;



public record CreateMessageChatCommand : IRequest<Response<bool>>
{
    public string ComplaintCode { get; set; }
    public string Message { get; set; }
    public IFormFile File { get; set; }

}

public class CreateMessageChatCommandHandler : IRequestHandler<CreateMessageChatCommand, Response<bool>>
{
    private readonly IRepository<Chat> _repository;
    private readonly IRepository<Complaint> _complaintRepo;
    private readonly ICurrentUserService _currentUserSvc;
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public CreateMessageChatCommandHandler(IRepository<Chat> repository,
        ICurrentUserService currentUserSvc,
        IRepository<Complaint> complaintRepo,
        IMediator mediator,
        IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
        _complaintRepo = complaintRepo;
        _currentUserSvc = currentUserSvc;
        _mediator = mediator;
    }

    public async Task<Response<bool>> Handle(CreateMessageChatCommand command, CancellationToken cancellationToken)
    {
        Response<bool> result = new();
        try
        {
            var complaint  = _complaintRepo.GetAllActive().First(x => x.TrackingCode == command.ComplaintCode);
            int attachId = 0;
            if(command.File != null)
            {
                attachId = (await _mediator.Send(new AddAttachmentsCommand
                        {
                            AttachDescription = new List<string> { command.File.FileName },
                            Attachments = new List<IFormFile> { command.File },
                            ComplaintId = complaint.Id
                        })).Result;
            }

            Chat chat = new()
            {
                ComplaintId = complaint.Id,
                //CreatedBy = _currentUserSvc.UserId != null ? _currentUserSvc.UserId : complaint.ComplainantId,
                Message = command.Message,
                CreatedOn = DateTime.Now,
                AttachmentId = attachId > 0 ? attachId : null,
            };
                           
            _repository.Add(chat);
          
            result.Result = _repository.Save();

        }
        catch (Exception ex)
        {
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }
        return result;
    }

} 

