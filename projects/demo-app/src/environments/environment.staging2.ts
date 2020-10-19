import { OwnIDFlow, IEnvironment } from './i-environment';

export const environment: IEnvironment = {
  production: true,
  gigyaApiKey: '3_O4QE0Kk7QstG4VGDPED5omrr8mgbTuf_Gim8V_Y19YDP75m_msuGtNGQz89X0KWP',
  ownidURLPrefix: 'https://passwordless.demo.skipthepassword.com/ownid',
  flow: OwnIDFlow.classic,
};

 
// export const environment: IEnvironment = {
//   production: true,
//   gigyaApiKey: '3_uQMbdn-ceccHKTdOmcCqrTDsGq3e7anDWcAxm2g4jFdE63dTpv1S8NCKy_sf_eEA',
//   ownidURLPrefix: '/netcore3/ownid',
//   flow: OwnIDFlow.classic,
// };
