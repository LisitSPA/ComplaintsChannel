using Domain.Entities;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.Mappings;

namespace Application.Translator.Queries.DTOs
{
    public record AzureResponseDto
    {
        public List<Translations> translations { get; set; }
        
    }

    public record Translations
    {
        public string text { get; set; }
        public string to { get; set; }

    }
}
