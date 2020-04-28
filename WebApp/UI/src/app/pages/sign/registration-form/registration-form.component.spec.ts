import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RegistrationFormComponent } from './registration-form.component';

describe('RegistrationFormComponent', () => {
  describe('Snapshot', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [RegistrationFormComponent],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    test('check snapshot', () => {
      const fixture = TestBed.createComponent(RegistrationFormComponent);

      expect(fixture).toMatchSnapshot();
    });
  });
});
