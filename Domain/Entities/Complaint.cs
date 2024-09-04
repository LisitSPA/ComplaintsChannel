
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
        public int ComplainantId { get; set; }
        public DateTime CreatedOn { get; set; }
        public string TrackingCode { get; set; }
        public EComplaintStatus EStatus { get; set; }
        public string ModifiedBy { get; set; } = "unknown";
        public DateTime? ModifiedOn { get; set; }
        public Person Complainant { get; set; }
        public List<Person> Involved { get; set; }
        public List<ComplaintType> Reasons { get; set; }
        public List<Attachtment> Attachments { get; set; }

    }

}