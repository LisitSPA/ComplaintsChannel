using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Notifications
{

    public static class EmailNotificacion
    {
        public static void SendEmail(string toEmail, string code)
        {
            var fromEmail = "MS_qgE106@trial-pxkjn41rxj5gz781.mlsender.net"; 
            var fromPassword = "K2AQaLvcwJCb4ADl";
            var smtpHost = "smtp.mailersend.net"; 
            var smtpPort = 587; 

                     
            var mailMessage = new MailMessage
            {
                From = new MailAddress(fromEmail),
                Subject = "Código Alfanumérico Generado",
                Body = $"Tu código alfanumérico es: {code}",
                IsBodyHtml = false
            };

            mailMessage.To.Add(toEmail);

            // Configurar el cliente SMTP
            using var smtpClient = new SmtpClient(smtpHost, smtpPort);

            smtpClient.Credentials = new NetworkCredential(fromEmail, fromPassword);
            smtpClient.EnableSsl = true;

            try
            {
                smtpClient.Send(mailMessage);
                Console.WriteLine("Correo enviado exitosamente.");
            }
            catch (SmtpException ex)
            {
                Console.WriteLine($"Error SMTP: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al enviar el correo: {ex.Message}");
            }
        }


    }
}
