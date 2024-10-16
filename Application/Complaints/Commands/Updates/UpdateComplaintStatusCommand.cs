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
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Utility.DTOs;
using Utility.Extensions;

namespace Application.Complaints.Commands.Updates;



public record UpdateComplaintStatusCommand : IRequest<Response<int>>
{
    public int ComplaintId { get; set; }
    public EComplaintStatus EComplaintStatus { get; set; }
    public string Notes { get; set; }
    //public List<IFormFile> Attachments { get; set; }

}

public class CreateComplaintCommandHandler(
    IRepository<Complaint> _repository,
        IMediator _mediator,
        ICurrentUserService _currentUserService,
        IEmailNotificationService _emailNotificationService
    ) 
    : IRequestHandler<UpdateComplaintStatusCommand, Response<int>>
{

    public async Task<Response<int>> Handle(UpdateComplaintStatusCommand command, CancellationToken cancellationToken)
    {
        Response<int> result = new();
        try
        {
            var complaint = _repository.GetAll().First(x => x.Id == command.ComplaintId);
            complaint.EStatus = command.EComplaintStatus;
            complaint.ModifiedBy = _currentUserService.UserId;
            complaint.ModifiedOn = DateTime.Now;

            complaint.ComplaintHistory = [new()
            {
                EStatus = command.EComplaintStatus,
                CreatedBy = _currentUserService.UserId.Value,
                Notes = command.Notes,
            }];

            _repository.Update(complaint);
            _repository.Save();

            //if(command.Attachments.Count > 0)
            //{
            //    _mediator.Send(new AddAttachmentsCommand { Attachments = command.Attachments, ComplaintId = complaint.Id});
            //}

            _emailNotificationService.SendEmail(new EmailNotification
            {
                Subject = "Actualización de denuncia",
                Body = new Dictionary<string, string> {
                    { "TITLE", "Tu denuncia ha cambiado de estado." },
                    { "TEXT", $"El estado de la denuncia ha sido actualizado a {command.EComplaintStatus.GetDescriptionByVal()}. <br><br>" +
                       $"Notas: {command.Notes}" }
                },
                ToEmail = complaint.TrackingEmail
            });

            result.Result = complaint.Id;

        }
        catch (Exception ex)
        {
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }
        return result;
    }


} 

