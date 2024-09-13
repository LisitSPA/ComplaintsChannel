
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{

    public class Complaint : BaseEntity
    {
        public string Description { get; set; }
        public DateTime IncidentDate { get; set; }
        public int? ComplainantId { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public string TrackingCode { get; set; }
        public EComplaintStatus EStatus { get; set; }
        public string ModifiedBy { get; set; } = "unknown";
        public DateTime? ModifiedOn { get; set; }
        public string TrackingEmail { get; set; }
        public User Complainant { get; set; }
        public List<ComplaintInvolved> ComplaintInvolved { get; set; }
        public List<ComplaintReasons> ComplaintReasons { get; set; }
        public List<Attachment> Attachments { get; set; }

    }

}