import { IEnvironment, OwnIDFlow } from './i-environment';

export const environment: IEnvironment = {
  production: true,
  gigyaApiKey: '3_hOdIVleWrXNvjArcZRwHJLiGA4e6Jrcwq7RfH5nL7ZUHyI_77z43_IQrJYxLbiq_',
  ownidURLPrefix: 'https://server.demo.dev.ownid.com/ownid',
  flow: OwnIDFlow.classic,
  screenSet: 'Default-RegistrationLogin',
};
