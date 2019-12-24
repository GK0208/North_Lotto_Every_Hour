using DataAccess;
using DataModel;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Helpers
{
    public static class DIModule
    {
        public static IServiceCollection RegisterModule(
           IServiceCollection services, string connectionString)
        {
            services.AddDbContext<LottoDbContext>(x =>
                x.UseSqlServer(connectionString));
            services.AddTransient<IRepository<User>, UserRepository>();
            services.AddTransient<IAdminRepository, AdminRepository>();
            services.AddTransient<IRepository<Bonus>, BonusRepository>();
            services.AddTransient<IRepository<LottoSession>, LottoSessionRepository>();
            services.AddTransient<IRepository<Ticket>, TicketRepository>();
       

            return services;
        }
    }
}
