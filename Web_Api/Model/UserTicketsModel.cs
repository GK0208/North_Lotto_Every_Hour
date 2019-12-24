using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class UserTicketsModel
    {
        public int TicketsLength { get; set; }
        public List<TicketModel> Tickets { get; set; }
    }
}
