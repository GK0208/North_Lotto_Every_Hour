using Model;
using Newtonsoft.Json;
using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;

namespace ScheduledTask
{
    class Program
    {
        static void Main(string[] args)
        {
            var timer = new Timer(Timer_Elapsed);
            timer.Change(3600000, 3600000);
            Console.ReadKey();
        }

        private async static void Timer_Elapsed(object o)
        {
            HttpClient client = new HttpClient
            {
                BaseAddress = new Uri("http://localhost:5000/api/admin/authenticate")
            };
            var contentType = new MediaTypeWithQualityHeaderValue("application/json");
            client.DefaultRequestHeaders.Accept.Add(contentType);

            LoginModel userModel = new LoginModel
            {
                Username = AdminCredentials.GetAdminUserName(),
                Password = AdminCredentials.GetAdminPassword()
            };

            string stringData = JsonConvert.SerializeObject(userModel);
            var contentData = new StringContent(stringData, System.Text.Encoding.UTF8, "application/json");

            HttpResponseMessage response = client.PostAsync("http://localhost:5000/api/admin/authenticate", contentData).Result;
            var deserializedObject = JsonConvert.DeserializeObject<TokenModel>(response.Content.ReadAsStringAsync().Result);
            string token = deserializedObject.Token;

            using (var drawClient = new HttpClient())
            {
                drawClient.DefaultRequestHeaders.Accept.Clear();
                drawClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                drawClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

                  await drawClient.PostAsync("http://localhost:5000/api/admin/startDraw", null);

            }

            Console.WriteLine(" Withdraw Done ! ");
            
        }
       
    }
    }
