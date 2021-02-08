import { IEnvironment, OwnIDFlow } from './i-environment';

export const environment: IEnvironment = {
  production: true,
  gigyaApiKey: '3_lDQBLLF5r8zMPcjIfKBHu0GIid109KK8SgmSyHvA8trqm5g4vDl4OgG1PMH-Vql1',
  ownidURLPrefix: 'https://multilevel1-server.dev.ownid.com/ownid',
  flow: OwnIDFlow.classic,
  screenSet: 'Default-RegistrationLogin',
};
