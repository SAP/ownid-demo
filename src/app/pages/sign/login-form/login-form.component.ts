import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GigyaService } from "@services/gigya.service";
import { Router } from "@angular/router";

@Component({
  selector: "login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  form: FormGroup;

  errors: string | null = null;

  hide = true;

  constructor(
    formBuilder: FormBuilder,
    private gigyaService: GigyaService,
    private router: Router
  ) {
    this.form = formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  login(): void {
    this.errors = null;
    if (this.form.valid) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.gigyaService.login(this.form.value, (data: any) => {
        if (data.status === "FAIL") {
          this.errors = data.errorDetails;
        } else {
          this.router.navigateByUrl("/account");
        }
      });
    }
  }
}
