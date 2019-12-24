using DataModel.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataModel
{
    public class Ticket
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Numbers { get; set; }
        public int UserId { get; set; }
        public int SessionId { get; set; }
        public virtual LottoSession Session { get; set; }
        public bool Active { get; set; }
        public virtual User User { get; set; }
        public bool Win { get; set; }
        public Prize ? Prize { get; set; }
    }
}
