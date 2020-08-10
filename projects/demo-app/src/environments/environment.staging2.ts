import { OwnIDFlow, IEnvironment } from './i-environment';

export const environment: IEnvironment = {
  production: true,
  gigyaApiKey: '3_uQMbdn-ceccHKTdOmcCqrTDsGq3e7anDWcAxm2g4jFdE63dTpv1S8NCKy_sf_eEA',
  ownidURLPrefix: '/netcore3/ownid',
  flow: OwnIDFlow.authOnly,
};
