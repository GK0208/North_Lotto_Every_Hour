using DataModel;
using DataModel.Enums;
using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Helpers
{
    public static class Mapping
    {
        public static UserModel UserToUserModel(this User user)
        {
            List<BonusModel> bonusModels = new List<BonusModel>();
            foreach(var bonus in user.Bonuses)
            {
                var bonusModel = bonus.BonusToBonusModel();
                bonusModels.Add(bonusModel);
            }
            var userModel = new UserModel()
            {
                Id= user.Id,
                UserName= user.UserName,
                Gender = user.Gender.ToString(),
                State= user.State,
                City = user.City,
                Balance = user.Balance,
                IsSubscribed = user.IsSubscribed,
                Age = user.Age,
                CardHolder = user.CardHolder,
                CardNumber = user.CardNumber,
                DateOfBirth = user.DateOfBirth,
                IsAccountConfirmed = user.IsAccountConfirmed,
                Mobile = user.Mobile,
                TicketsLength = user.Tickets.Count,
                Bonuses = bonusModels
            };
            return userModel;
        }

        public static BonusModel BonusToBonusModel(this Bonus bonus)
        {
            BonusModel model = new BonusModel()
            {
                Id=bonus.Id,
                Award = bonus.Award,
                ExpirationDate = bonus.Expiration
            };
            return model;
        }

        public static User RegisterModelToUser(this RegisterModel model)
        {

            var gender = model.Gender.Length > 0 ? model.Gender.ToEnum<Gender>() : Gender.Undifined;
            var newUser = new User()
            {
                UserName = model.Username,
                Age = model.Age,
                City = model.City,
                State = model.State,
                DateOfBirth = model.DateOfBirth,
                Balance = model.Balance,
                IsSubscribed = false,
                Gender = gender,
                Mobile = model.Mobile,
                CardNumber = model.CardNumber,
                CardHolder = model.CardHolder,
                IsAccountConfirmed = false
            };
            return newUser;
        }

        public static AdminModel AdminToAdminModel(this Admin admin)
        {

            var adminModel = new AdminModel()
            {
                Id = admin.Id,
                UserName = admin.UserName,
                Age = admin.Age,
                City = admin.City,
                State = admin.State,
                DateOfBirth = admin.DateOfBirth,
                Gender = admin.Gender.ToString(),
                Mobile = admin.Mobile
            };
            return adminModel;
        }

        public static LottoSessionModel LottoSessionToSessionModel(this LottoSession session)
        {

            var sessionModel = new LottoSessionModel()
            {
                Active = session.Active,
                TotalTickets = session.TotalTickets,
                WinningNumbers = session.WinningNumbers,
                CreatedAt = session.CreatedAt
            };
            return sessionModel;
        }
    }
}
