using System;
using System.Collections.Generic;
using System.Text;

namespace DataModel.Interfaces
{
    public interface IUser
    {
        int Id { get; set; }
        string UserName { get; set; }
        string Password { get; set; }
    }
}
