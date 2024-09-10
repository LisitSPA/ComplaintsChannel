using Application.Common.Interfaces;
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

namespace Application.Complaints.Commands.Creates;



public record CreateComplaintCommand : IRequest<Response<bool>>
{
    public List<int> Reasons { get; set; }
    public bool IsAnonimo { get; set; }
    public string Description { get; set; }
    public DateTime IncidentDate { get; set; }
    public List<PersonInvolvedDto> PersonInvolveds { get; set; }  
    public List<IFormFile> Attachments { get; set; }
    public List<string> AttachDescription { get; set; }
    public ComplainantDto Complainant { get; set; }
    public string ContactEmail { get; set; }

}

public class CreateComplaintCommandHandler : IRequestHandler<CreateComplaintCommand, Response<bool>>
{
    private readonly IRepository<Complaint> _repository;
    private readonly IRepository<Person> _repoPerson;
    private readonly IRepository<Attachtment> _repoAttach;
    private readonly IMapper _mapper;

    public CreateComplaintCommandHandler(IRepository<Complaint> repository, 
        IRepository<Person> repoPerson,
        IRepository<Attachtment> repoAttach,
        IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
        _repoPerson = repoPerson;
        _repoAttach = repoAttach;
    }

    public async Task<Response<bool>> Handle(CreateComplaintCommand command, CancellationToken cancellationToken)
    {
        Response<bool> result = new();
        try
        {
            Complaint complaint = new Complaint
            {
                Description = command.Description,
                IncidentDate = command.IncidentDate,
                EStatus = EComplaintStatus.Registry,
            };

            //List<ComplaintReasons> reasons = [];
            //command.Reasons.ForEach(reason =>
            //{
            //    reasons.Add(new ComplaintReasons
            //    {
            //        ComplaintTypeId = reason
            //    });
            //});

            //complaint.Reasons = reasons;

            //if (!command.IsAnonimo)
            //{
            //    complaint.Complainant = _mapper.Map<Person>(command.Complainant);
            //}

            complaint.TrackingCode = GenerateCode().ToUpper();
            complaint.TrackingEmail = command.ContactEmail;

            //_repository.Add(complaint);

          
            //complaint.Attachments = SetAttachments(command.Attachments, command.AttachDescription);
            //_repository.Save();


            //SetInvolveds(command.PersonInvolveds, complaint.Id);
            //_repository.Save();

            EmailNotificacion.SendEmail(complaint.TrackingEmail, complaint.TrackingCode);


        }
        catch (Exception ex)
        {
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }
        return result;
    }


    private List<Attachtment> SetAttachments(List<IFormFile> attachments, List<string> descriptions)
    {
        var attactments = new List<Attachtment>();
        int index = 0;
        attachments.ForEach(item =>
        {
            string fileBase64 = "";
            using (var memoryStream = new MemoryStream())
            {
                item.CopyTo(memoryStream);
                byte[] fileBytes = memoryStream.ToArray();
                fileBase64 = Convert.ToBase64String(fileBytes);
            }

            attactments.Add(new Attachtment
            {
                FileBase64 = fileBase64,
                Description = descriptions.Count >= index ? descriptions[index] : "",
                FileName = item.Name,
                ContentType = item.ContentType
            });
            index++;
        });
        return attactments;
    }

    private bool SetInvolveds(List<PersonInvolvedDto> personInvolvedDtos, int complaintId)
    {
        personInvolvedDtos.ForEach(p =>
        {
            var person = _repoPerson.GetAllActive().Where(x => x.Names.Contains(p.Names) && x.LastName.Contains(p.LastName)).FirstOrDefault();
            person ??= _repoPerson.Add(_mapper.Map<Person>(p));

            person.ComplaintInvolveds.Add(new ComplaintInvolved
            {
                ComplaintId = complaintId,
            });
        });

         return true;
    }

    private string GenerateCode()
    {
        string code = Guid.NewGuid().ToString("N")[..5];
        while(_repository.GetAll().Where(x=> x.TrackingCode == code).Any())
        {
            GenerateCode();
        }

        return code;
    }
   
    
} 

