using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Helpers
{
    public static class UserNumbersValidator
    {
        public static bool CheckTicketNumbers(this List<int> ticketNumbers)
        {
            if (ticketNumbers.Count != 7) return false;
            for (int i = 0; i < ticketNumbers.Count; i++)
            {
                for (int j = i + 1; j < ticketNumbers.Count; j++)
                {
                    if (ticketNumbers[j] == ticketNumbers[i]) return false;
                    if (ticketNumbers[j] > 36 || ticketNumbers[j] < 1) return false;
                }
            }
            return true;
        }
    }
}
