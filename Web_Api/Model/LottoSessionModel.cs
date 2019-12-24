using DataModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class LottoSessionModel
    {
        public int Id { get; set; }
        public bool Active { get; set; } = true;
        public DateTime CreatedAt { get; set; }
        public string  WinningNumbers { get; set; } 
        public int TotalTickets { get; set; }
    }
}
