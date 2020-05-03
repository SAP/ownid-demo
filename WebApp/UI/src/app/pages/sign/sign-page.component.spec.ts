import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IOwnidRs, SignPageComponent } from './sign-page.component';
import { SetProfileCommand } from './commands/set-profile.command';

describe('SignPageComponent', () => {
  let setProfileCommand: SetProfileCommand;

  beforeEach(() => {
    setProfileCommand = {} as SetProfileCommand;
    setProfileCommand.execute = jest.fn();
  });

  describe('Snapshot', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: SetProfileCommand,
            useValue: setProfileCommand,
          },
        ],
        declarations: [SignPageComponent],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    test('check snapshot', () => {
      const fixture = TestBed.createComponent(SignPageComponent);

      expect(fixture).toMatchSnapshot();
    });
  });

  describe('onLogin', () => {
    it('should call set profile command', () => {
      const sut = new SignPageComponent(setProfileCommand);

      sut.onLogin({ identities: {} } as IOwnidRs);

      expect(setProfileCommand.execute).toBeCalledWith({});
    });
  });

  describe('onRegister', () => {
    it('should call set profile command', () => {
      const sut = new SignPageComponent(setProfileCommand);

      sut.onRegister({ identities: {} } as IOwnidRs);

      expect(setProfileCommand.execute).toBeCalledWith({});
    });
  });
});
