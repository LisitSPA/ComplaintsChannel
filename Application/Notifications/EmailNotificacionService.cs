using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using DevExpress.ClipboardSource.SpreadsheetML;
using Microsoft.AspNetCore.Http;
using Notifications.Helpers;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Net.Mime;
using System.IO;

namespace Application.Notifications
{
    public interface IEmailNotificationService
    {
        public void SendEmail(EmailNotification notification);
    }


    public class EmailNotificationService(IConfiguration _configuration) : IEmailNotificationService
    {
        public void SendEmail(EmailNotification notification)
        {
            var fromEmail = _configuration["EmailConfiguration:Email"];

            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
            smtpClient.Credentials = new NetworkCredential(fromEmail, _configuration["EmailConfiguration:Password"]);
            smtpClient.EnableSsl = true;

            notification.Body.Add("URIPORTAL", _configuration["UriPortal"]);

           
            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress(fromEmail);
            mailMessage.To.Add(notification.ToEmail);
            mailMessage.Subject = notification.Subject;
            mailMessage.Body = Templates.FillTemplate(_configuration["EmailConfiguration:DirTemplates"], notification.TemplateName ?? "GeneralTemplate.html", notification.Body).Result;
            mailMessage.IsBodyHtml = true;
          
            if(notification.Attachments != null)
                foreach (var file in notification.Attachments)
                {
                    var stream = file.OpenReadStream();
                    var attach = new Attachment(stream, file.FileName, MediaTypeNames.Application.Octet);
                    mailMessage.Attachments.Add(attach);
                }                

            try
            {
                smtpClient.Send(mailMessage);
            }
            catch (SmtpException ex)
            {
                Console.WriteLine($"Error SMTP: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error to send the email: {ex.Message}");
            }
            finally
            {
                // Limpia los recursos después de enviar el correo
                foreach (var attachment in mailMessage.Attachments)
                {
                    attachment.Dispose();
                }
                mailMessage.Dispose();
            }
        }


    }

    public class EmailNotification
    {
        public string ToEmail { get; set; }
        public Dictionary<string, string> Body { get; set; }
        public string Subject { get; set; }
        public string TemplateName { get; set; }
        public List<IFormFile> Attachments { get; set; }
    }


}