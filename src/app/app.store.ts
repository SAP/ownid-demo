import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface IProfile {
  email: string;
  nickname: string;
  firstName: string;
  lastName: string;
}

@Injectable()
export class AppStore {
  readonly profile$ = new BehaviorSubject<IProfile>({} as IProfile);
}
