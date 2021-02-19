export interface IEnvironment {
  production: boolean;
  ownidURLPrefix: string;
  hideMagic?: boolean;
  screenSet: string;
}


export enum OwnIDFlow {
  classic,
  authOnly
}