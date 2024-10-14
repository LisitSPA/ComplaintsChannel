using Application.Complaints.Queries.DTOs;
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
        public string CreatedBy { get; set; }
        public Attachment Attachment { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Chat, ChatDto>()
                .ForMember(x => x.CreatedBy, opt => opt.MapFrom(s => s.User != null ? $"{s.User.Names} {s.User.LastName}" : "Anómimo" ))
                ;

        }
    }
}
