using System.Text.Json.Serialization;

namespace WebApp.Gigya
{
    public class BaseGigyaResponse
    {
        [JsonPropertyName("errorCode")]
        public int ErrorCode { get; set; }
        
        [JsonPropertyName("errorMessage")]
        public string ErrorMessage { get; set; }
    }
}