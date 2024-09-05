using Application.Common.Interfaces;
using Application.Complaints.Queries.DTOs;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
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
    public List<AttachmentDto> Attachments { get; set; }
    public List<string> AttachDescription { get; set; }
    public ComplainantDto Complainant { get; set; }
    public string ContactEmail { get; set; }

}

public class CreateComplaintCommandHandler : IRequestHandler<CreateComplaintCommand, Response<bool>>
{
    private readonly IRepository<Complaint> _repository;
    private readonly IRepository<Person> _repoPerson;
    private readonly IRepository<ComplaintInvolved> _repoInvolved;
    private readonly IMapper _mapper;

    public CreateComplaintCommandHandler(IRepository<Complaint> repository, 
        IRepository<Person> repoPerson,
        IRepository<ComplaintInvolved> repoInvolved,
        IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
        _repoPerson = repoPerson;
        _repoInvolved = repoInvolved;
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

            command.Reasons.ForEach(reason => {
                complaint.Reasons.Add(new ComplaintReasons
                {
                    ComplaintTypeId = reason
                });
            });

            if (!command.IsAnonimo)
            {
                complaint.Complainant = _mapper.Map<Person>(command.Complainant);
            }

            _repository.Save();

           SetAttachments(command.Attachments);

           SetInvolveds(command.PersonInvolveds, complaint.Id);

        }
        catch (Exception ex)
        {
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }
        return result;
    }


    private bool SetAttachments(List<AttachmentDto> attachments)
    {
        //foreach (var item in attachments)
        //{
        //    byte[] bytes = Convert.FromBase64String(item.file);
        //    String file = Convert.ToBase64String(bytes);
        //}
        return true;
    }

    private bool SetInvolveds(List<PersonInvolvedDto> personInvolvedDtos, int complaintId)
    {
        personInvolvedDtos.ForEach(p =>
        {
            var person = _repoPerson.GetAllActive().Where(x => x.Names.Contains(p.Names) && x.LastName.Contains(p.LastName)).FirstOrDefault();
            if (person == null)
            {
                person = _repoPerson.Add(_mapper.Map<Person>(p));
            }

            person.ComplaintInvolveds.Add(new ComplaintInvolved
            {
                ComplaintId = complaintId,
            });
        });

         return true;
    }
} 

