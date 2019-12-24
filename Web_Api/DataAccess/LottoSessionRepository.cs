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
    public class LottoSessionRepository : IRepository<LottoSession>
    {
        private readonly LottoDbContext _context;

        public LottoSessionRepository(LottoDbContext context)
        {
            _context = context;
        }

        public int Create(LottoSession entity)
        {
            _context.Sessions.Add(entity);
            _context.SaveChanges();

            return entity.Id;
      
        }

        public void Delete(LottoSession entity)
        {
            _context.Sessions.Remove(entity);
            _context.SaveChanges();
        }

        public  IEnumerable<LottoSession> GetAll()
        {
            return _context.Sessions.ToList();
        }

        public  int  Update(LottoSession entity)
        {
            _context.Sessions.Update(entity);
            return _context.SaveChanges();
        }
    }
}
