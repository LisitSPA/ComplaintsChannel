using Domain.Entities;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.Mappings;

namespace Application.Users.Queries.DTOs
{
    public record UserLoginDto : IMapFrom<User>
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string RUT { get; set; }
        public string Names { get; set; }
        public string LastName { get; set; }
        public string Position { get; set; }
        public string Area { get; set; }
        public string PersonDescription { get; set; }
        public string ContactPhone { get; set; }
        public string ContactEmail { get; set; }
        public EUserType EUserType { get; set; }
        public ECompanyStatus ECompanyStatus { get; set; }
    }
}
