using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using OwnIdSdk.NetCore3.Web.Abstractions;

namespace WebApp
{
    public class ClientAppChallengeHandler : IChallengeHandler
    {
        public Task UpdateProfileAsync(string did, Dictionary<string, string> profileFields)
        {
            throw new NotImplementedException();
        }

        public async Task OnSuccessLoginAsync(string did, HttpRequest context)
        {
            throw new NotImplementedException();
        }
    }
}