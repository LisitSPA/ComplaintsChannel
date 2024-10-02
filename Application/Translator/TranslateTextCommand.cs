using Application.Common.Interfaces;
using Application.Complaints.Queries.DTOs;
using Application.Notifications;
using Application.Translator;
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



public record TranslateTextCommand : IRequest<Response<List<string>>>
{

    public string Language { get; set; }
    public List<string> Text { get; set; }
}

public class TranslateTextCommandHandler(IAzureTranslatorService _translatorService) : IRequestHandler<TranslateTextCommand, Response<List<string>>>
{
   
    public async Task<Response<List<string>>> Handle(TranslateTextCommand command, CancellationToken cancellationToken)
    {
        Response<List<string>> result = new();
        try
        {
            command.Text.ForEach(text =>
            {
                result.Result.Add(_translatorService.Translate(text, command.Language).Result);
            });
        }
        catch (Exception ex)
        {
            result.ErrorProvider.AddError(ex.Source, ex.GetBaseException().Message);
        }
        return result;
    }

  
    
} 

