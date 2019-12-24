using DataModel;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DataAccess
{
    public class BonusRepository : IRepository<Bonus>
    {

        private readonly LottoDbContext _context;

        public BonusRepository(LottoDbContext context)
        {
            _context = context;
        }

        public int Create(Bonus entity)
        {
            _context.Bonuses.Add(entity);
            _context.SaveChanges();
            return entity.Id;
        }

        public void Delete(Bonus entity)
        {
            _context.Bonuses.Remove(entity);
            _context.SaveChanges();
        }

        public IEnumerable<Bonus> GetAll()
        {
            return _context.Bonuses.ToList();
        }

        public int Update(Bonus entity)
        {
            _context.Bonuses.Update(entity);
            return _context.SaveChanges();
        }
    }
}
