using DataModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess
{
   public interface IAdminRepository : IRepository<Admin>
    {
        int GiveUserAdminPermision(User user);
    }
}
