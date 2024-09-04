using Azure;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Complaints.Commands.Creates;

public record CreateComplaintCommand : IRequest<Response<bool>>
{
    public bool IsAnonimo { get; set; }
    public string Description { get; set; }
    public DateTime IncidentDate { get; set; }
    public string RUT { get; set; } //TODO
    public string Names { get; set; }
    public string LastName { get; set; }
    public string Position { get; set; }
    public string Area { get; set; }
    public EGenre EGenre { get; set; }
    public ECompanyStatus ECompanyStatus { get; set; }
    public string ContactPhone { get; set; }
    public string ContactEmail { get; set; }
    public List<FormFile> Attachments { get; set; }
}

