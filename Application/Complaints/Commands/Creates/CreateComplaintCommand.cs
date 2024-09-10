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



public record CreateComplaintCommand : IRequest<Response<int>>
{
    public List<int> Reasons { get; set; }
    public bool IsAnonimo { get; set; }
    public string Description { get; set; }
    public DateTime IncidentDate { get; set; }
    public List<PersonInvolvedDto> PersonInvolveds { get; set; }  
    public ComplainantDto Complainant { get; set; }
    public string ContactEmail { get; set; }

}

public class CreateComplaintCommandHandler : IRequestHandler<CreateComplaintCommand, Response<int>>
{
    private readonly IRepository<Complaint> _repository;
    private readonly IRepository<Person> _repoPerson;
    private readonly IMapper _mapper;

    public CreateComplaintCommandHandler(IRepository<Complaint> repository, 
        IRepository<Person> repoPerson,
        IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
        _repoPerson = repoPerson;
    }

    public async Task<Response<int>> Handle(CreateComplaintCommand command, CancellationToken cancellationToken)
    {
        Response<int> result = new();
        try
        {
            Complaint complaint = new Complaint
            {
                Description = command.Description,
                IncidentDate = command.IncidentDate,
                EStatus = EComplaintStatus.Registry,
            };

            List<ComplaintReasons> reasons = [];
            command.Reasons.ForEach(reason =>
            {
                reasons.Add(new ComplaintReasons
                {
                    ComplaintTypeId = reason
                });
            });

            complaint.ComplaintReasons = reasons;

            if (!command.IsAnonimo)
            {
                complaint.Complainant = SetComplainant(command.Complainant);
                complaint.Complainant.ContactEmail = command.ContactEmail;
            }

            complaint.TrackingCode = GenerateCode().ToUpper();
            complaint.TrackingEmail = command.ContactEmail;

            _repository.Add(complaint);
            _repository.Save();

            SetInvolveds(command.PersonInvolveds, complaint.Id);
            _repository.Save();

            EmailNotificacion.SendEmail(complaint.TrackingEmail, complaint.TrackingCode);

            result.Result = complaint.Id;

        }
        catch (Exception ex)
        {
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }
        return result;
    }


    private bool SetInvolveds(List<PersonInvolvedDto> personInvolvedDtos, int complaintId)
    {
        personInvolvedDtos.ForEach(p =>
        {
            var person = _repoPerson.GetAllActive().Where(x => x.Names.Contains(p.Names) && x.LastName.Contains(p.LastName)).FirstOrDefault();
            person ??= _repoPerson.Add(_mapper.Map<Person>(p));
            person.EPersonType = EPersonType.Employee;

            person.ComplaintInvolveds = new List<ComplaintInvolved>()
            {
                 new ComplaintInvolved
                {
                    ComplaintId = complaintId,
                }
            };
        });

         return true;
    }

    private Person SetComplainant(ComplainantDto complainant)
    {
        
        var person = _repoPerson.GetAllActive().Where(x => x.Names.Contains(complainant.Names) && x.LastName.Contains(complainant.LastName)).FirstOrDefault();
        person ??= _repoPerson.Add(_mapper.Map<Person>(complainant));
        person.EPersonType = person.EPersonType.HasFlag(EPersonType.Complainant) ? person.EPersonType : EPersonType.Complainant;
              
        return person;
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

