import { async, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { LoginFormComponent } from "./login-form.component";

describe("LoginFormComponent", () => {
  describe("Snapshot", () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [LoginFormComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    }));

    test("check snapshot", () => {
      const fixture = TestBed.createComponent(LoginFormComponent);

      expect(fixture).toMatchSnapshot();
    });
  });
});
