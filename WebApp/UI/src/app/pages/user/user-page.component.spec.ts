import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppStore } from '../../app.store';
import { UserPageComponent } from './user-page.component';

describe('UserPageComponent', () => {
  describe('Snapshot', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [AppStore],
        declarations: [UserPageComponent],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    test('check snapshot', () => {
      const fixture = TestBed.createComponent(UserPageComponent);

      expect(fixture).toMatchSnapshot();
    });
  });
});
