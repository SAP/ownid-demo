using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace WebApp.Gigya.Login
{
    public class LoginResponse : BaseGigyaResponse
    {
        [JsonPropertyName("sessionInfo")]
        public Dictionary<string, string> SessionInfo { get; set; }
        
        [JsonPropertyName("identities")]
        public Dictionary<string, string> Identities { get; set; }
    }
}