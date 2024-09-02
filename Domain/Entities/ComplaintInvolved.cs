
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class ComplaintInvolved
    {
        public int Id { get; set; }
        public int ComplaintId { get; set; }
        public int PersonId { get; set; }
        public List<Complaint> Complaints { get; set; }
        public List<Person> People { get; set; }

    }
    
}