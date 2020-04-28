using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OwnIdSdk.NetCore3.Configuration;
using OwnIdSdk.NetCore3.Cryptography;
using OwnIdSdk.NetCore3.Store;
using OwnIdSdk.NetCore3.Web;

namespace WebApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        private const string CorsPolicyName = "AllowAll";
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(x =>
            {
                x.AddPolicy(CorsPolicyName , builder =>
                {
                    // builder.AllowCredentials();
                    builder.AllowAnyHeader();
                    builder.AllowAnyMethod();
                    builder.AllowAnyOrigin();
                });
            });

            var ownIdSection = Configuration.GetSection("ownid");
            using (var publicKeyReader = File.OpenText(ownIdSection["pub_key"]))
            using (var privateKeyReader = File.OpenText(ownIdSection["private_key"]))   
            {
                services.AddOwnId<ClientAppChallengeHandler, InMemoryCacheStore>(new ProviderConfiguration(
                    RsaHelper.ReadKeyFromPem(publicKeyReader),
                    RsaHelper.ReadKeyFromPem(privateKeyReader),
                    ownIdSection["web_app_url"],
                    new List<ProfileField>
                    {
                        ProfileField.Email,
                        ProfileField.FirstName,
                        ProfileField.LastName
                    }, 
                    ownIdSection["callback_url"],
                    new Requester
                    {
                        DID = ownIdSection["did"],
                        Name = ownIdSection["name"],
                        Description = ownIdSection["description"]
                    }
                ));
            }
            
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "wwwroot";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            
            app.UseCors(CorsPolicyName);
            app.UseDefaultFiles();
            // Serve wwwroot/dist as a root 
            // app.UseStaticFiles(new StaticFileOptions() 
            // {
            //     FileProvider = new PhysicalFileProvider(
            //         Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot"))
            // });
            
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            
            app.UseOwnId();
            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "UI";
            });

            // app.UseRouting();
            //
            // app.UseAuthorization();
            //
            // app.UseEndpoints(endpoints => { endpoints.MapRazorPages(); });
        }
    }
}