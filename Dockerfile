FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ./WebApp/*.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY ./WebApp ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "WebApp.dll"]

# docker build -t client-app:latest .
# docker run --rm -it -p 8080:80 client-app:latest