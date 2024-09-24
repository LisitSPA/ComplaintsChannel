
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{

    public class ComplaintHistory
    {
        public int Id { get; set; }
        public int ComplaintId { get; set; }
        public EComplaintStatus EStatus { get; set; }
        public string Notes { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public int CreatedBy { get; set; }
    }

}