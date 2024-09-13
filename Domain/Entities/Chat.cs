
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{

    public class Chat : BaseEntity
    {
        public int ComplaintId { get; set; }
        public int? AttachmentId { get; set; }
        public string Message { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? CreatedBy { get; set; }
        
    }
    
}