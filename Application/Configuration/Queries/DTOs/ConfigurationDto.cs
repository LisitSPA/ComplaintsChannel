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

namespace Application.Configuration.Queries.DTOs
{
    public class ConfigurationDto : IMapFrom<User>
    {
        public string Logo { get; set; }
        public string Color { get; set; }

    
    }
}
