export interface IEnvironment {
  production: boolean;
  gigyaApiKey: string;
  ownidURLPrefix: string;
  flow: OwnIDFlow
}


export enum OwnIDFlow {
  classic,
  authOnly
}