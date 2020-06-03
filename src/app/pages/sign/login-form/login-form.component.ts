import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  email = new FormControl("", [Validators.required, Validators.email]);

  hide = true;
}
