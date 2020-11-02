import { OwnIDFlow, IEnvironment } from './i-environment';

export const environment: IEnvironment = {
  production: true,
  gigyaApiKey: '3_O4QE0Kk7QstG4VGDPED5omrr8mgbTuf_Gim8V_Y19YDP75m_msuGtNGQz89X0KWP',
  ownidURLPrefix: 'https://server.demo4.ownid.com/ownid',
  flow: OwnIDFlow.classic,
};
