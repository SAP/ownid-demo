import { IEnvironment, OwnIDFlow } from './i-environment';

export const environment: IEnvironment = {
  production: true,
  gigyaApiKey: '3_hOdIVleWrXNvjArcZRwHJLiGA4e6Jrcwq7RfH5nL7ZUHyI_77z43_IQrJYxLbiq_',
  ownidURLPrefix: '/netcore3/ownid',
  flow: OwnIDFlow.classic,
};
