using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class UserPaginationModel
    {
        public int UsersLength { get; set; }
        public List<UserModel> Users { get; set; }
    }
}
