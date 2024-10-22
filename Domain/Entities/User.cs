
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class User : BaseEntity
    {
        public string RUT { get; set; }
        public string Names { get; set; }
        //public string LastName { get; set; }
        public string Position { get; set; }
        public string Area { get; set; }
        public string PersonDescription { get; set; }
        public EGenre EGenre { get; set; }
        public EUserType EUserType { get; set; }
        public ECompanyStatus ECompanyStatus { get; set; }
        public string ContactPhone { get; set; }
        public string ContactEmail { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool ChangePassword { get; set; }
        public bool Deleted { get; set; }

        public List<Complaint> Complaints { get; set; }
        public List<ComplaintInvolved> ComplaintInvolveds { get; set; }
    }
    
}