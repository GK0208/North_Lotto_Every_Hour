using DataModel;
using DataModel.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class TicketModel
    {
        public int TicketId { get; set; }
        public int UserId { get; set; }
        public string Numbers { get; set; }
        public bool Active { get; set; }
        public bool Win { get; set; }
        public string Prize { get; set; }
        public int SessionId { get; set; }
    }
}
