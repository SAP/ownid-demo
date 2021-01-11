# OwnID Demo

## Description
OwnID enables your customers to use their phone as a key to instantly login to your websites or apps. Passwords are finally gone.

This client app is demonstrating the way how we can integrate [web-ui-sdk](https://github.com/sap/ownid-web-ui-sdk) into client application.

It does not cover server side integration. Examples can be found at corresponding server side SDKs. For example, for .Net CORE, you can find it at [server-sdk-net](https://github.com/sap/ownid-server-sdk-net) at `OwnIdSdk.NetCore3.Server.Gigya` project

Evaluation is possible even without any back-end implementation. You can follow the developer-tutorial to set your environment. This is using OwnID back-end that already include the SAP CDC (Gigya) integration. Later on you can provide your SAP CDC (Gigya) credentials to set your production environment or you can take OwnID server SDK and implement the integration to your Identity Management System.

[![REUSE status](https://api.reuse.software/badge/github.com/SAP/ownid-demo)](https://api.reuse.software/info/github.com/SAP/ownid-demo)

## Documentation
OwnID Documentation you can find on our [Documentation](https://docs.ownid.com) page


## Before run

It is recommended to run following apps before OwinID Demo

- [OwnID Web App](https://github.com/sap/ownid-webapp)
- Any server app which integrate OwinID server SDK, for example [OwnId server SDK for NET Core 3](https://github.com/sap/ownid-server-sdk-net) (project `OwnIdSdk.NetCore3.Server.Gigya`)

## Run from source

### Install NodeJS

Currently supported NodeJS version is [`12.17.0`](https://nodejs.org/en/blog/release/v12.17.0/)

For Mac, please use [macOS Installer (.pkg) ](https://nodejs.org/download/release/v12.17.0/node-v12.17.0.pkg)

Another installation options can be found here: [v12.17.0](https://nodejs.org/download/release/v12.17.0/)


### Clone this repo

```shell
git clone git@github.com:sap/ownid-demo
```

### Install dependencies

```shell
npm install
```

### Start development server

```shell
npm start
```

Navigate to [http://localhost:4200/](http://localhost:4200/).
