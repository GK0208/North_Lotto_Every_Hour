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
    public class TicketRepository: IRepository<Ticket>
    {
        private readonly LottoDbContext _context;

        public TicketRepository(LottoDbContext context)
        {
            _context = context;
        }

        public int Create(Ticket entity)
        {
            _context.Tickets.Add(entity);
            _context.Sessions.Single(x => x.Id == entity.SessionId).TotalTickets++;
            var user = _context.Users.SingleOrDefault(x => x.Id == entity.UserId);
            user.Balance -= 5;

            return _context.SaveChanges();
            
        }

        public void Delete(Ticket entity)
        {
            _context.Tickets.Remove(entity);
            _context.SaveChanges();
        }

        public  IEnumerable<Ticket> GetAll()
        {
            return _context.Tickets.ToList();
        }

        public int  Update(Ticket entity)
        {
            _context.Tickets.Update(entity);
            return _context.SaveChanges();
        }
    }
}
