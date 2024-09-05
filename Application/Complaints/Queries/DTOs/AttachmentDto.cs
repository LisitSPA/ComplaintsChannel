using Domain.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.Mappings;

namespace Application.Complaints.Queries.DTOs
{
    public class AttachmentDto 
    {
        public IFormFile file { get; set; }
        public string Description { get; set; }
    }
}
