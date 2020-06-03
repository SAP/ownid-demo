import { async, TestBed } from "@angular/core/testing";
import { ElementRef, NO_ERRORS_SCHEMA } from "@angular/core";
import { OwnidComponent } from "./ownid.component";

describe("OwnidComponent", () => {
  describe("Snapshot", () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [OwnidComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    }));

    test("check snapshot", () => {
      const fixture = TestBed.createComponent(OwnidComponent);

      expect(fixture).toMatchSnapshot();
    });
  });

  describe("ngOnInit", () => {
    it("should call getChallengeCommand.execute", () => {
      const el = { nativeElement: { el: true } } as ElementRef;
      // @ts-ignore-next-line
      window.ownid = {
        init: jest.fn(),
        render: jest.fn()
      };

      const sut = new OwnidComponent(el);

      sut.type = "login";

      sut.ngOnInit();
      // @ts-ignore-next-line
      expect(window.ownid!.init).toBeCalled();
    });
  });
});
