using Model;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace AuthomaticDraw
{
    class Program
    {
        
        static void Main(string[] args)
        {
           
            LoginModel model = new LoginModel()
            {
                Username = "JohnDoe",
                Password = "John"
            };

            HttpClient client = new HttpClient();

            
        }
    }
    
}
