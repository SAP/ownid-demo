import { BehaviorSubject } from 'rxjs';

export interface INote {
  characters: number;
  words: number
  id: string;
  body: string;
  created: string;
  updated: string;
}

export interface IProfile {
  email: string;
  name: string;
  isOwnidUser: boolean;
}

export class AppStore {
  readonly profile$ = new BehaviorSubject<IProfile>({} as IProfile);

  readonly notes$ = new BehaviorSubject<INote[]>([]);
}
