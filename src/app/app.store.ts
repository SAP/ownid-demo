import { BehaviorSubject } from "rxjs";

export interface IProfile {
  email: string;
  nickname: string;
  firstName: string;
  lastName: string;
}

export class AppStore {
  readonly profile$ = new BehaviorSubject<IProfile>({} as IProfile);
}
