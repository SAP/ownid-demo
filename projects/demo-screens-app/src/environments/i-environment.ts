export interface IEnvironment {
  production: boolean;
  gigyaApiKey: string;
  ownidURLPrefix: string;
  flow: OwnIDFlow;
  hideMagic?: boolean;
}


export enum OwnIDFlow {
  classic,
  authOnly
}