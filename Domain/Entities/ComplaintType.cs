
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{

    public class ComplaintType : BaseEntity
    {

        public string Description { get; set; }
        
    }
    
}