using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.Mappings;

namespace Application.Complaints.Queries.DTOs
{
    public class PersonInvolvedDto : IMapFrom<Person>
    {
        public string Names { get; set; }
        public string LastName { get; set; }
        public string PersonDescription { get; set; }


        public void Mapping(Profile profile)
        {
            profile.CreateMap<PersonInvolvedDto, Person>();
        }

    }


}
