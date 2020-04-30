FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /app

ENV OWNID__WEB_APP_URL="http://sign.dev.ownid.com/sign"
ENV OWNID__CALLBACK_URL="http://localhost:5000"
ENV OWNID__PUB_KEY="./keys/jwtRS256.key.pub"
ENV OWNID__PRIVATE_KEY="./keys/jwtRS256.key"
ENV OWNID__DID="did:ownid:151850889514"
ENV OWNID__NAME="mozambiquehe.re"
ENV OWNID__DESCRIPTION="Description here"
ENV GIGYA__SECRET="g157+kUR3kxvgIX4MneEWnVgBVzhQe4dXfoNe9ceSNA="
ENV GIGYA__API_KEY="3_s5-gLs4aLp5FXluP8HXs7_JN40XWNlbvYWVCCkbNCqlhW6Sm5Z4tXGGsHcSJYD3W"
ENV ASPNETCORE_Kestrel__Certificates__Default__Password="ownid321"
ENV ASPNETCORE_Kestrel__Certificates__Default__Path=aspnetapp.pfx

# Copy csproj and restore as distinct layers
COPY ./WebApp/*.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY ./WebApp ./
RUN dotnet publish -c Release -o out
COPY ./WebApp/aspnetapp.pfx /app/out/aspnetapp.pfx

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "WebApp.dll"]

# docker build -t ownid-client-app:latest .
# docker run --rm -it -p 80:5000 -p 443:5001 ownid-client-app:latest