import { OwnIDFlow, IEnvironment } from './i-environment';

export const environment: IEnvironment = {
  production: true,
  gigyaApiKey: '3_7_S7SAvBaZSfIIO9A-kLKFXVzjo3tPUMI0_5KNmAC6tdotjPx8MRy1lxtsfJpcT-',
  ownidURLPrefix: '/netcore3/ownid',
  flow: OwnIDFlow.authOnly,
};
