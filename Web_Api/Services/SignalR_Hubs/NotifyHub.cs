using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace DataAccess
{
    public class NotifyHub : Hub
    {
        public async Task SendMessage()
        {
            await Clients.All.SendAsync("alertUsers");
            await Clients.All.SendAsync("alertAdmins");
        }
    }
}