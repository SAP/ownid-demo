export interface IEnvironment {
  production: boolean;
  gigyaApiKey: string;
  ownidURLPrefix: string;
  flow: OwnIDFlow;
  hideMagic?: boolean;
  screenSet: string;
}


export enum OwnIDFlow {
  classic,
  authOnly
}