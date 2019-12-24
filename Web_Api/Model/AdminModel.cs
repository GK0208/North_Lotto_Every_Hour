using DataModel;
using DataModel.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class AdminModel
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Age { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Mobile { get; set; }
        public List<LottoSessionModel> Sessions { get; set; } = new List<LottoSessionModel>();
    }
}
