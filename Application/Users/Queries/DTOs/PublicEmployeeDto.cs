using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.Extensions;
using Utility.Mappings;

namespace Application.Users.Queries.DTOs
{
    public class PublicEmployeeDto : IMapFrom<User>
    {
        public string Names { get; set; }
        public string Position { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<User, PublicEmployeeDto>();
        }
    }
}
