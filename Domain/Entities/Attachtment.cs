
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{

    public class Attachtment : BaseEntity
    {

        public string FileName { get; set; }
        public string File { get; set; }
        public string Description { get; set; }
        
    }
    
}