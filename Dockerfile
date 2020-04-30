FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /app

EXPOSE 5000
EXPOSE 5001

ENV OWNID__WEB_APP_URL="http://sign.dev.ownid.com/sign"
ENV OWNID__CALLBACK_URL="http://localhost:5000"
ENV OWNID__PUB_KEY="./keys/jwtRS256.key.pub"
ENV OWNID__PRIVATE_KEY="./keys/jwtRS256.key"
ENV OWNID__DID="did:ownid:151850889514"
ENV OWNID__NAME="mozambiquehe.re"
ENV OWNID__DESCRIPTION="Description here"
ENV GIGYA__SECRET="g157+kUR3kxvgIX4MneEWnVgBVzhQe4dXfoNe9ceSNA="
ENV GIGYA__API_KEY="3_s5-gLs4aLp5FXluP8HXs7_JN40XWNlbvYWVCCkbNCqlhW6Sm5Z4tXGGsHcSJYD3W"

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
# docker run -it -p 5000:5000 -p 5001:5001 ownid-client-app:latest