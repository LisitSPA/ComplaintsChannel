using Application.Complaints.Queries.DTOs;
using Application.Users.Queries.DTOs;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.Mappings;

namespace Application.Chats.Queries.DTOs
{
    public class ChatDto : IMapFrom<Chat>
    {
        public int Id { get; set; }
        public int? AttachmentId { get; set; }
        public string Message { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedByName { get; set; }
        public int? CreatedBy { get; set; }
        public Attachment Attachment { get; set; }
        public int ComplaintId { get; set; }
        public UserDto User { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Chat, ChatDto>()
                .ForMember(x => x.CreatedByName, opt => opt.MapFrom(s => s.User != null ? $"{s.User.Names}" : "Anómimo" ))
                ;

        }
    }
}
