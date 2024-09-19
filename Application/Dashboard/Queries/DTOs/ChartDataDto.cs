using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dashboard.Queries.DTOs
{
    public class TotalComplaintsDto
    {
        public int TotalComplaints { get; set; }
        public int ComplaintsInProcess { get; set; }
        public int PendingComplaints { get; set; }


    }
}
