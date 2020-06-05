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
  isOwnidUSer: boolean;
}

export class AppStore {
  readonly profile$ = new BehaviorSubject<IProfile>({
    name: 'Dani Knowles',
    email: 'sol-ring@gmail.com',
    isOwnidUSer: true,
  } as IProfile);

  readonly notes$ = new BehaviorSubject<INote[]>([
    {
      id: '1591260991443',
      body: '<div>Title of your note</div><div>Jot down your ideas here...</div>',
      created: '1591260991443',
      updated: '1591260991443',
      characters: 45,
      words: 9,
    },
    {
      id: '1591261173145',
      body: `<div>My standup comedy ideas for next year</div>
             <div>Why did the chicken cross the road during the COVID-19 pandemic?</div>
             <div>It didn’t, because the chicken is sheltering in place haha!</div>`,
      created: '1591261173145',
      updated: '1591261173145',
      characters: 188,
      words: 28,
    },
  ]);
}
