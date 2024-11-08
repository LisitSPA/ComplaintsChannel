using Application.Users.Queries.DTOs;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.Extensions;
using Utility.Mappings;

namespace Application.Complaints.Queries.DTOs
{
    public class ComplaintDto : IMapFrom<Complaint>
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime IncidentDate { get; set; }
        public int? ComplainantId { get; set; }
        public DateTime CreatedOn { get; set; }
        public string TrackingCode { get; set; }
        public EComplaintStatus EStatus { get; set; }
        public string Status { get; set; }
        //public string ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string TrackingEmail { get; set; }
        public UserDto Complainant { get; set; }
        public List<PersonInvolvedDto> Involved { get; set; }
        public List<ComplaintType> Reasons { get; set; }
        public List<Attachment> Attachments { get; set; }
        public List<ComplaintHistory> ComplaintHistory { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Complaint, ComplaintDto>()
                .ForMember(x => x.Involved, opt => opt.MapFrom(s => s.ComplaintInvolved.Select(x => x.PersonInvolved)))
                .ForMember(x => x.Reasons, opt => opt.MapFrom(s => s.ComplaintReasons.Select(x => x.ComplaintType)))
                .ForMember(x => x.Status, opt => opt.MapFrom(s => s.EStatus.GetDescriptionByVal() ))
                ;

        }

    }
}
