import { OwnIDFlow, IEnvironment } from './i-environment';

export const environment: IEnvironment = {
  production: true,
  gigyaApiKey: '3_hOdIVleWrXNvjArcZRwHJLiGA4e6Jrcwq7RfH5nL7ZUHyI_77z43_IQrJYxLbiq_',
  ownidURLPrefix: 'https://passwordless.demo.dev.skipthepassword.com/ownid',
  flow: OwnIDFlow.classic,
  screenSet: 'Default-RegistrationLogin',
};
