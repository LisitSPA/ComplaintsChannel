using Application.Users.Commands;
using FluentValidation;


namespace Application.Login.Commands
{
    public class ValidateLoginCommandValidator : AbstractValidator<ValidateLoginCommand>
    {
        public ValidateLoginCommandValidator() 
        {
            RuleFor(x => x.Password)
                .NotEmpty()
                .NotNull()
                .WithMessage(x => "Password is required");

            RuleFor(x => x.Username)
              .NotEmpty()
              .NotNull()
              .WithMessage(x => "Username is required");
        }
    }
}
