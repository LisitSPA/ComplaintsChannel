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
using System.Net.Mail;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Utility.DTOs;

namespace Application.Complaints.Commands.Creates;



public record AddAttachmentsCommand : IRequest<Response<bool>>
{
    public int ComplaintId { get; set; }
    public List<IFormFile> Attachments { get; set; }
    public List<string> AttachDescription { get; set; }
}

public class AddAttachmentsCommandHandler : IRequestHandler<AddAttachmentsCommand, Response<bool>>
{
    private readonly IRepository<Complaint> _repository;
    private readonly IRepository<Person> _repoPerson;
    private readonly IRepository<Attachtment> _repoAttach;
    private readonly IMapper _mapper;

    public AddAttachmentsCommandHandler(IRepository<Complaint> repository, 
        IRepository<Person> repoPerson,
        IRepository<Attachtment> repoAttach,
        IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
        _repoPerson = repoPerson;
        _repoAttach = repoAttach;
    }

    public async Task<Response<bool>> Handle(AddAttachmentsCommand command, CancellationToken cancellationToken)
    {
        Response<bool> result = new();
        try
        {
            int index = 0;
            command.Attachments.ForEach(item =>
            {
                string fileBase64 = "";
                using (var memoryStream = new MemoryStream())
                {
                    item.CopyTo(memoryStream);
                    byte[] fileBytes = memoryStream.ToArray();
                    fileBase64 = Convert.ToBase64String(fileBytes);
                }

                _repoAttach.Add(new Attachtment
                {
                    FileBase64 = fileBase64,
                    Description = command.AttachDescription.Count >= index ? command.AttachDescription[index] : "",
                    FileName = item.FileName,
                    ContentType = item.ContentType,
                    ComplaintId = command.ComplaintId
                });
                index++;
            });

            result.Result = _repository.Save();

        }
        catch (Exception ex)
        {
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }
        return result;
    }

  
    
} 

