import { async, TestBed } from '@angular/core/testing';
import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { OwnidComponent } from './ownid.component';

describe('OwnidComponent', () => {
  describe('Snapshot', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [OwnidComponent],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    test('check snapshot', () => {
      const fixture = TestBed.createComponent(OwnidComponent);

      expect(fixture).toMatchSnapshot();
    });
  });

  describe('ngOnInit', () => {
    it('should call window.ownid.init', () => {
      const el = { nativeElement: { el: true } } as ElementRef;
      // @ts-ignore-next-line
      window.ownid = {
        init: jest.fn(),
        render: jest.fn(),
      };

      const sut = new OwnidComponent(el);

      sut.type = 'login';

      sut.ngOnInit();
      // @ts-ignore-next-line
      expect(window.ownid.init).toBeCalled();
      // @ts-ignore-next-line
      expect(window.ownid.render).toBeCalled();
    });

    it('should call window.ownid!.init', () => {
      const el = { nativeElement: { el: true } } as ElementRef;
      // @ts-ignore-next-line
      window.ownid = {
        init: jest.fn(),
        render: jest.fn(),
        gigya: {
          renderLink: jest.fn(),
        },
      };

      const sut = new OwnidComponent(el);

      sut.type = 'link';

      sut.ngOnInit();
      // @ts-ignore-next-line
      expect(window.ownid!.gigya.renderLink).toBeCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should call destroy', () => {
      const el = { nativeElement: { el: true } } as ElementRef;
      // @ts-ignore-next-line
      window.ownid = {
        init: jest.fn(),
        render: jest.fn(),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sut: any = new OwnidComponent(el);

      sut.type = 'login';

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sut.ownidWidget = {} as any;
      sut.ownidWidget.destroy = jest.fn();

      sut.ngOnDestroy();

      expect(sut.ownidWidget.destroy).toBeCalled();
    });
  });
});
