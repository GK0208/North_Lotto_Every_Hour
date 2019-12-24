using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class RegisterModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public int Age { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Mobile { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int CardNumber { get; set; }
        public string CardHolder { get; set; }
        public int Balance { get; set; }
        public string CardPassword { get; set; }
    }
}
