﻿using Application.Chats.Queries.DTOs;
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
    public record UserLoginDto : IMapFrom<User>
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string RUT { get; set; }
        public string Names { get; set; }
        public string LastName { get; set; }
        public string CompleteName { get; set; }
        public string Position { get; set; }
        public string Area { get; set; }
        public string PersonDescription { get; set; }
        public string ContactPhone { get; set; }
        public string ContactEmail { get; set; }
        public EUserType EUserType { get; set; }
        public string UserType { get; set; }
        public ECompanyStatus ECompanyStatus { get; set; }
        public bool ChangePassword { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<User, UserLoginDto>()
                .ForMember(x => x.UserType, opt => opt.MapFrom(s => s.EUserType.GetDescriptionByVal()))
                .ForMember(x => x.CompleteName, opt => opt.MapFrom(s => $"{s.Names} {LastName}"))
                ;

        }
    }
}
