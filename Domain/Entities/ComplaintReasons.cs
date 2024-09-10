
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{

    public class ComplaintReasons
    {

        public int Id { get; set; }
        public int ComplaintId { get; set; }
        public int ComplaintTypeId { get; set; }
        
        public ComplaintType ComplaintType { get; set; }
        public Complaint Complaint { get; set; }
    }
    
}