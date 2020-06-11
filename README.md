# OwnID client app

## Overview

The main purpose of OwnID client app is demonstrating the way how we can integrate [web-ui-sdk](https://github.wdf.sap.corp/OwnID/web-ui-sdk) into client application.

It does not cover server side integration. Examples can be found at corresponding server side SKDs. For example, for .Net CORE, you can find it at [OwnID/server-sdk-net](https://github.wdf.sap.corp/OwnID/server-sdk-net) at `OwnIdSdk.NetCore3.Server.Gigya` project

## Before run

It is recommended to run following apps before OwinID client app

- [OwnID Web App](https://github.wdf.sap.corp/OwnID/webapp)
- Any server app which integrate OwinID server SDK, for example [OwnId server SDK for NET Core 3](https://github.wdf.sap.corp/OwnID/server-sdk-net) (project `OwnIdSdk.NetCore3.Server.Gigya`)

## Run from source

### Install NodeJS

Currently supported NodeJS version is [`12.17.0`](https://nodejs.org/en/blog/release/v12.17.0/)

For Mac, please use [macOS Installer (.pkg) ](https://nodejs.org/download/release/v12.17.0/node-v12.17.0.pkg)

Another installation options can be found here: [v12.17.0](https://nodejs.org/download/release/v12.17.0/)

### Install brew (optional)

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

### Install yarn

using brew (if you've installed it)

```shell
brew install yarn
```

using NPM (not recommended)

```shell
npm install --global yarn
```

> Note: Installation of Yarn via npm is generally not recommended. When installing Yarn with Node-based package managers, the package is not signed, and the only integrity check performed is a basic SHA1 hash, which is a security risk when installing system-wide apps.
>
> For these reasons, it is highly recommended that you install Yarn through the installation method best suited to your operating system.

Another alternatives can be found here:
https://classic.yarnpkg.com/en/docs/install/#alternatives-stable

### Clone this repo

```shell
git clone git@github.wdf.sap.corp:OwnID/web-ui-sdk.git
```

Note: if you need to generate SSH and add it to the ssh-agent, please use this instruction:

[Generating a new SSH key and adding it to the ssh-agent](https://help.github.com/en/enterprise/2.20/user/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

### Configure local environment

In order to run client app locally, you need to update local configuration.

First of all, you need to set link to your local web server with integrated OwnId server SDK.
It must be done at file [proxy.conf.json](proxy.conf.json).

If you are using `OwnId server SDK for NET Core 3` server side integration example, your config file should looks like this:

```JSON
{
  "/ownid": {
    "target": "http://localhost:5002",
    ...
  }
}
```

You should also update URL prefix at [src/app/shared/ownid/ownid.component.ts](src/app/shared/ownid/ownid.component.ts) from `/netcore3/ownid` to `/ownid`. So your file should looks like this:

```TS
...
window.ownid!.init({
    statusInterval: 3000,
    URLPrefix: "/ownid"
});
...
```

### Install dependencies

```shell
yarn install
```

### Start development server

```shell
yarn start
```

Navigate to [http://localhost:4200/](http://localhost:4200/).

## Deployment

### Deployment Overview

CI process configured to deliver latest version to dev and staging environments

- `Dev` environment is being updated from `develop` branch
- `Staging` environment is being update from `master` branch

In case of failed build, message is being sent to the `#ownid-cicd` Slack channel

### Tools

For deployment purposes, [Travis](https://travis-ci.com/) hosted continuous integration service is being used

Deployment configuration can be found at [.travis.yml](.travis.yml) file

### Deployment Process

During deployment process:

- new docker image is being created
- this image is being deployed to the Kubernetes at the AWS

Deployment script can be found at [scripts/deploy.sh](scripts/deploy.sh) file

### Environments

Environment definitions can be found here:

- Dev env: [manifests/dev.yaml](manifests/dev.yaml)
- Staging env: [manifests/staging.yaml](manifests/staging.yaml)

## Other

### Certificates on Mac

```shell
sudo security add-trusted-cert \
 -d -r trustRoot \
 -k /Library/Keychains/System.keychain ./scripts/keys/self-signed.crt
```
