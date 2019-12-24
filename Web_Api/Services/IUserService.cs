using DataModel;
using Microsoft.AspNetCore.Mvc;
using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services
{
    public interface IUserService
    {
        void CreateTicket(TicketModel ticket);
        WinnerPaginationModel GetAllWinners(int page, string filter, string userName);
        UserPaginationModel GetAllUsers(int take);
        UserModel GetUserByEmailAndPassword(string email, string password);
        bool ConfirmBonus(int id);
        TokenModel RefreshToken(string token, string refreshToken);
        TokenModel Authenticate(string username, string password);
        int Register(RegisterModel model);
        void Update(UserModel user);
        List<UserModel> GetAll();
        UserTicketsModel getAllTicketsByUserId(int userId, int page, string filter);
        int SubscribeUser(string userEmail);
        int AddCredit(AddCreditModel model);
    }
}
