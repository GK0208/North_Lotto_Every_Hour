using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;
using static System.Net.WebRequestMethods;

namespace Services.Helpers
{
    public static class ConfirmAccountMail
    {
        public static void SendMail(string email)
        {
          
            try
            {
                SmtpClient client = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential("scraperproduct@gmail.com", "bfnkfhjacxusyngg"),
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network
                };
                MailMessage mail = new MailMessage
                {
                    From = new MailAddress("scraperproduct@gmail.com"),
                    Subject = $"Account Confirmation ",
                    Body = $"<h2> Confirm Your account by clicking the link bellow </h2> <br/><a href=\"http://localhost:3001/confirmAccount?email={email}\" > Click me to confirm your North Lotto Every Hour account ! </a> ",
                    IsBodyHtml = true
                };

                mail.To.Add(email);    
                client.Send(mail);

            }
            catch (Exception ex)
            {

                throw new ApplicationException(ex.Message);
            }

        }

    }
}
