using DataModel.Enums;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace DataModel.LottoHelpers
{
    public static class LottoHelpers
    {
        public static int CheckTicketStatus(this List<int> ticketNumbers, List<int> winningNumbers)
        {
            int match = 0;

            for (int i = 0; i < winningNumbers.Count; i++)
            {
                for (int j = 0; j < ticketNumbers.Count; j++)
                {
                    if (ticketNumbers[j] == winningNumbers[i]) match++;
                }
            }

            return match;
        }

        public static Prize GetAward(this Ticket ticket, int matches)
        {
            Prize award;
            switch (matches)
            {
                case 3:
                    award = Prize.GiftCard50;
                    break;
                case 4:
                    award = Prize.GiftCard100;
                    break;
                case 5:
                    award = Prize.TV;
                    break;
                case 6:
                    award = Prize.Vacation;
                    break;
                case 7:
                    award = Prize.Car;
                    break;
                default:
                    throw new KeyNotFoundException();
            }
            return award;
        }
    }

   

    

}

