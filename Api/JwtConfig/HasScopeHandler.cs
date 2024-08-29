using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Api.JwtConfig
{
    public class HasScopeHandler : AuthorizationHandler<HasScopeRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, HasScopeRequirement requirement)
        {
            // If user does not have the scope claim, get out of here
            if (!context.User.HasClaim(c => c.Type == "scope"))
                return Task.CompletedTask;

            // Split the scopes string into an array
            var scopes = context.User.FindFirst(c => c.Type == "scope").Value.Split(' ');

            // Succeed if the scope array contains the required scope
            if (requirement.Scope.Split(',').Any(x => scopes.Contains(x.Trim())))
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}