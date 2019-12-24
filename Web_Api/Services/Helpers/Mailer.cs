using DataModel;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace Services.Helpers
{
    public static class Mailer
    {
       
        public static void SendMail(List<string> recipients ,LottoSession session)
        {
            var winningTickets = session.Tickets?.Where(x => x.Win == true).ToList();
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

                    Subject = $"Results from North Lotto Every Hour session : {session.Id}",
                    Body = winningTickets != null ?
                      $"<h2> Winning combination : {session.WinningNumbers} </h2> " +
                    $"<p> Total tickets : {session.TotalTickets} </p>" 
                    :
                     $"<h2> Winning combination : {session.WinningNumbers} </h2> " +
                    $"<p> Total tickets : {session.TotalTickets} </p>" +
                    $"<h3> :( No Winners in session {session.Id} :( </h3>",
                    IsBodyHtml = true
                };



                mail.Attachments.Add(new Attachment(Directory.GetFiles("SessionResultsStorage").Last()));

                recipients.ForEach(user =>
                {
                    mail.To.Add(user);
                    
                });
                client.Send(mail);

            }
            catch (Exception ex)
            {

                throw new ApplicationException(ex.Message);
            }
          
        }
    }
}
