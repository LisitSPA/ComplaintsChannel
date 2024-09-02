using System;

namespace Domain.Entities
{
    public class BaseEntity
    {
        public int Id { get; set; }
        public bool Active { get; set; } = true;
        
    }
}