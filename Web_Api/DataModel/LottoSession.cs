using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataModel
{
    [Serializable]
    public class LottoSession
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public bool Active { get; set; }
        public int AdminId { get; set; }
        public string WinningNumbers { get; set; }
        public int TotalTickets { get; set; }
        public DateTime CreatedAt { get; set; }
        public virtual Admin Admin { get; set; }
        public virtual ICollection<Ticket> Tickets { get; set; }
       
    }
}
