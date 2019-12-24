using DataModel;
using DataModel.Enums;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class UserRepository : IRepository<User>
    {
        private readonly LottoDbContext _context;

        public UserRepository(LottoDbContext context)
        {
            _context = context;
        }

        public int Create(User entity)
        {
            _context.Users.Add(entity);
            _context.SaveChanges();

            return entity.Id;
        }

        public void Delete(User entity)
        {
            _context.Users.Remove(entity);
            _context.SaveChanges();
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users.Include(x => x.Tickets).Include(x => x.Bonuses).ToList();
        }

        public int  Update(User entity)
        {

            _context.Users.Update(entity);

            return _context.SaveChanges();
        }

    }
}
