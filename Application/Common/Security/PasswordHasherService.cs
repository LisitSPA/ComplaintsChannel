using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Utility.PasswordHasher
{

    public interface IPasswordHasherService
    {
        string HashPassword(string password);

        bool VerifyPassword(string enteredPassword, string storedHash);
    }

    public class PasswordHasherService : IPasswordHasherService
    {
        private readonly PasswordHasher<string> _passwordHasher = new PasswordHasher<string>();


        public string HashPassword(string password)
        {
            return _passwordHasher.HashPassword(null, password);
        }


        public bool VerifyPassword(string enteredPassword, string storedHash)
        {
            var result = _passwordHasher.VerifyHashedPassword(null, storedHash, enteredPassword);
            return result == PasswordVerificationResult.Success;
        }

        public string GeneratePassword()
        {

        }
    }
}
