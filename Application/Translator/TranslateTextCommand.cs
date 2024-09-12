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
using Utility.Translator;

namespace Application.Complaints.Commands.Creates;



public record TranslateTextCommand : IRequest<Response<List<string>>>
{
    public string Languaje { get; set; }
    public List<string> Text { get; set; }
}

public class TranslateTextCommandHandler : IRequestHandler<TranslateTextCommand, Response<List<string>>>
{
   

    public TranslateTextCommandHandler(
       )
    {
       
    }

    public async Task<Response<List<string>>> Handle(TranslateTextCommand command, CancellationToken cancellationToken)
    {
        Response<List<string>> result = new();
        try
        {
            command.Text.ForEach(text =>
            {
                result.Result.Add(Translator.TranslateText(text, command.Languaje));
            });
        }
        catch (Exception ex)
        {
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }
        return result;
    }

  
    
} 

