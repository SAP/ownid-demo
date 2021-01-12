import { IEnvironment, OwnIDFlow } from './i-environment';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: IEnvironment = {
  production: false,
  gigyaApiKey: '3_hOdIVleWrXNvjArcZRwHJLiGA4e6Jrcwq7RfH5nL7ZUHyI_77z43_IQrJYxLbiq_',
  ownidURLPrefix: '/ownid',
  flow: OwnIDFlow.classic,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
