import { OwnIDFlow, IEnvironment } from './i-environment';

export const environment: IEnvironment = {
  production: true,
  gigyaApiKey: '3_PB4ieNpwSS1acHt7bb9UmosWpzHgXiTNW5OHaea2b833e4WhchqkzJum3vP60EGM',
  ownidURLPrefix: 'https://server.demo3.staging.ownid.com/ownid',
  flow: OwnIDFlow.classic,
};
