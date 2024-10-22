
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{

    public class Parameters : BaseEntity
    {
        public string Code { get; set; }
        public int? Value { get; set; }
        public string TextValue { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? CreatedBy { get; set; }
   
    }
    
}