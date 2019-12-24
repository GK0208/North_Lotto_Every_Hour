using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class AddCreditModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string CardHolder { get; set; }
        public int CardNumber { get; set; }
        public int Amount { get; set; }
    }
}
