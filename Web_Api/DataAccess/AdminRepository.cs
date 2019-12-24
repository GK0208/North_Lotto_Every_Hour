using DataModel;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class AdminRepository : IRepository<Admin>,IAdminRepository
    {
        private readonly LottoDbContext _context;

        public AdminRepository(LottoDbContext context)
        {
            _context = context;
        }

        public int Create(Admin entity)
        {
            _context.Admins.Add(entity);
            _context.SaveChanges();
            return entity.Id;
        }

        public void Delete(Admin entity)
        {
            _context.Admins.Remove(entity);
            _context.SaveChanges();
        }

        public IEnumerable<Admin> GetAll()
        {
            return  _context.Admins.ToList();
        }

        public int Update(Admin entity)
        {
            _context.Admins.Update(entity);
            return _context.SaveChanges();
        }

        public int GiveUserAdminPermision(User userModel)
        {
            var user = _context.Users.Find(userModel.Id);
            var newAdmin = new Admin()
            {
                UserName = user.UserName,
                Password = user.Password,
                Age = user.Age,
                City = user.City,
                State = user.State,
                DateOfBirth = user.DateOfBirth,
                Gender = user.Gender
            };
            _context.Admins.Add(newAdmin);
            _context.Users.Remove(user);


            return _context.SaveChanges();

        }
    }
}
