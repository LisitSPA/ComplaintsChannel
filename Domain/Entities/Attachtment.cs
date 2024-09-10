
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{

    public class Attachtment : BaseEntity
    {
        public int ComplaintId { get; set; }
        public string FileName { get; set; }
        public string FileBase64 { get; set; }
        public string Description { get; set; }
        public string ContentType { get; set; }
        
    }
    
}