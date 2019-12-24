using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace DataModel
{
    public class LottoDbContext : DbContext
    {
      
        public LottoDbContext(DbContextOptions options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Bonus> Bonuses { get; set; }
        public DbSet<LottoSession> Sessions { get; set; }
        public DbSet<Ticket> Tickets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Bonus>(entity =>
            {
                entity.HasOne(x => x.User)
                 .WithMany(x => x.Bonuses)
                 .HasForeignKey(x => x.UserId);
            });

            modelBuilder.Entity<Bonus>()
                .HasData(
                   new Bonus()
                   {
                     Id=1,
                     Award=5,
                     UserId=48
                   });

            modelBuilder.Entity<Ticket>(entity =>
            {
                entity.HasOne(x => x.User)
                .WithMany(x => x.Tickets)
                .HasForeignKey(x => x.UserId);

                entity.HasOne(x => x.Session)
                    .WithMany(x => x.Tickets)
                    .HasForeignKey(x => x.SessionId);

            });

            modelBuilder.Entity<LottoSession>()
                .HasOne(x => x.Admin)
                .WithMany(x => x.Sessions)
                .HasForeignKey(x => x.AdminId);

            var md5 = new MD5CryptoServiceProvider();
            var md5data = md5.ComputeHash(Encoding.ASCII.GetBytes("John"));
            var hashedPassword = Encoding.ASCII.GetString(md5data);

            modelBuilder.Entity<Admin>()
                 .HasData(
                    new Admin()
                    {
                        Id = 1,
                        UserName = "JohnDoe",
                        Password = hashedPassword
                    });

            var md4 = new MD5CryptoServiceProvider();
            var md5Userdata = md4.ComputeHash(Encoding.ASCII.GetBytes("Bobsky200"));
            var hashedUserPassword = Encoding.ASCII.GetString(md5Userdata);

            modelBuilder.Entity<User>()
                 .HasData(
                    new User()
                    {
                        Id = 1,
                        UserName = "BobBobsky@yahoo.com",
                        Password = hashedUserPassword
                       
                    }
                );



        }

    }
}

