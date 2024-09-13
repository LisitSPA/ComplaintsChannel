using FluentValidation;
using MediatR;
using System.Collections.Generic;
using System.Linq.Dynamic.Core;
using System.Linq;
using System;
using Application.Chats.Commands.Creates;
using Application.Common.Interfaces;
using Domain.Entities;

namespace Application.CardRequests.Commands.Creates
{
    public class CreateMessageChatCommandValidator : AbstractValidator<CreateMessageChatCommand>
    {
        private readonly IMediator _mediator;
        private readonly ICurrentUserService _currentUser;
        private readonly IRepository<Complaint> _complaintRepo;

        public CreateMessageChatCommandValidator(IMediator mediator, 
            ICurrentUserService currentUser,
            IRepository<Complaint> complaintRepo)
        {
            _mediator = mediator;
            _currentUser = currentUser;
            _complaintRepo = complaintRepo;

            RuleFor(c => c.ComplaintCode)
                .Must(mustExist).WithMessage("Invalid code");
        }

      
        private bool mustExist(string code)
        {
            return !_complaintRepo.GetAllActive().Any(x => x.TrackingCode == code);
        }



    }
}
