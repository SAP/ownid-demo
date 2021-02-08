import { OwnIDFlow, IEnvironment } from './i-environment';

export const environment: IEnvironment = {
  production: true,
  gigyaApiKey: '3_PB4ieNpwSS1acHt7bb9UmosWpzHgXiTNW5OHaea2b833e4WhchqkzJum3vP60EGM',
  ownidURLPrefix: 'https://passwordless.demo.skipthepassword.com/ownid',
  flow: OwnIDFlow.classic,
  screenSet: 'Default-RegistrationLogin',
};

 
// export const environment: IEnvironment = {
//   production: true,
//   gigyaApiKey: '3_uQMbdn-ceccHKTdOmcCqrTDsGq3e7anDWcAxm2g4jFdE63dTpv1S8NCKy_sf_eEA',
//   ownidURLPrefix: '/netcore3/ownid',
//   flow: OwnIDFlow.classic,
// };
