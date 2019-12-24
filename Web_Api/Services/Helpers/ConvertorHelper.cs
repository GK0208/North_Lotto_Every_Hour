using DataModel;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services.Helpers
{
    public static class ConvertorHelper
    {
        public static List<int> StringToList(this string str)
        {
            return str.Split(',').Select(int.Parse).ToList();
        }

        public static List<TicketModel> ConvertToTicketModel(this List<Ticket> tickets)
        {
            List<TicketModel> ticketModels = new List<TicketModel>();
            foreach(var ticket in tickets)
            {
                ticketModels.Add(
                    new TicketModel()
                    {
                        TicketId=ticket.Id,
                        UserId = ticket.UserId,
                        Active = ticket.Active,
                        Numbers = ticket.Numbers,
                        SessionId=ticket.SessionId,
                        Prize=ticket.Prize.ToString(),
                        Win=ticket.Win
                    });
            }
            return ticketModels;
        }

        public static T ToEnum<T>(this string value)
        {
            return (T)Enum.Parse(typeof(T), value, true);
        }

    }
}
