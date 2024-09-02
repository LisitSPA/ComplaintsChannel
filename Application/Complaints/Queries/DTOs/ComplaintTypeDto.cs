using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.Mappings;

namespace Application.Queries.DTOs
{
    public class ComplaintTypeDto : IMapFrom<ComplaintType>
    {
        public int Id { get; set; }
        public string Description { get; set; }
    }
}
