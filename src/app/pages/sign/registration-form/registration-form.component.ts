import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationFormComponent {
  email = new FormControl("", [Validators.required, Validators.email]);

  firstName = new FormControl("", [Validators.required]);

  lastName = new FormControl("", [Validators.required]);

  hide = true;

  hideConfirm = true;
}
