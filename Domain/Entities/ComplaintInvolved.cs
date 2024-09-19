
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
        public int UserId { get; set; }
        public Complaint Complaints { get; set; }
        public User PersonInvolved { get; set; }

    }
    
}