using DataModel.Enums;
using DataModel.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataModel
{
    public class User: IUser
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public Gender Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Age { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Mobile { get; set; }
        public bool IsSubscribed { get; set; }
        public int CardNumber { get; set; }
        public string CardHolder { get; set; }
        public string RefreshToken { get; set; }
        public int Balance { get; set; }
        public List<Bonus> Bonuses { get; set; }
        public bool IsAccountConfirmed { get; set; }
        public virtual ICollection<Ticket> Tickets { get; set; }
    }
}
