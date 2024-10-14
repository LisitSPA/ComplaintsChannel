﻿using AutoMapper;
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
    public class UserDto : IMapFrom<User>
    {
        public string RUT { get; set; }
        public string Names { get; set; }
        public string LastName { get; set; }
        public ECompanyStatus ECompanyStatus { get; set; }
        public string CompanyStatus { get; set; }
        public string Position { get; set; }
        public string Area { get; set; }
        public EGenre EGenre { get; set; }
        public string Genre { get; set; }
        public string ContactPhone { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<UserDto, User>();
            profile.CreateMap<User, UserDto>()
                .ForMember(x => x.CompanyStatus, opt => opt.MapFrom(s => s.ECompanyStatus.GetDescriptionByVal()))
                .ForMember(x => x.Genre, opt => opt.MapFrom(s => s.EGenre.GetDescriptionByVal()));
        }
    }
}
