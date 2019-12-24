using DataModel;
using Microsoft.AspNetCore.Mvc;
using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services
{
    public interface IAdminService
    {
        void CreateSession(AdminModel model);
        TokenModel RefreshToken(string token, string refreshToken);
        List<Admin> GetAll();
        AdminModel GetAdminById(int id);
        void Update(AdminModel model);
        void StartDraw(int adminId);
        void GiveUserBonus(UserModel model);
        void GiveUserAdminAccess(UserModel model);
        WinnerPaginationModel GetAllWinners(int page, string filter, string userName);
        object Authenticate(string username, string password);
        void Register(RegisterModel model);
    }
}
