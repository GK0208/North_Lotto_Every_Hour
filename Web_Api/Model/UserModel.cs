using DataModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class UserModel
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public int Age { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Mobile { get; set; }
        public string Gender { get; set; }
        public string Token { get; set; }
        public int TicketsLength { get; set; }
        public DateTime DateOfBirth { get; set; }
        public bool IsSubscribed { get; set; }
        public int CardNumber { get; set; }
        public string CardHolder { get; set; }
        public int Balance { get; set; }
        public List<BonusModel> Bonuses { get; set; }
        public bool IsAccountConfirmed { get; set; }
       
    }
}
