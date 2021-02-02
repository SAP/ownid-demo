import { IEnvironment, OwnIDFlow } from './i-environment';

export const environment: IEnvironment = {
  production: true,
  gigyaApiKey: '3_ciJvtpB4KZm1qWhrhltQ15xnwqrZfZfg4sfci1qktljOQbg6QouY3hf5Hk4haTR5',
  ownidURLPrefix: 'https://multilevel2-server.dev.ownid.com/ownid',
  flow: OwnIDFlow.classic,
  screenSet: 'Child2-RegistrationLogin',
};
