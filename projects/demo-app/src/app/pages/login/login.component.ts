import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GigyaService } from '../../services/gigya.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;

  errors: string | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private ownidWidget: any | null = null;

  private observer: MutationObserver;

  constructor(
    formBuilder: FormBuilder,
    private gigyaService: GigyaService,
    private router: Router,
    private elementRef: ElementRef,
  ) {
    this.form = formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });

    this.observer = new MutationObserver(() => this.ownidWidget?.recalculatePosition());

    this.observer.observe(this.elementRef.nativeElement, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.errors = null;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.gigyaService.login(this.form.value, async (data: any) => {
        if (data.status === 'FAIL') {
          this.errors = data.errorDetails;
        } else {
          // @ts-ignore
          const statusRS = await window.ownid.getOwnIDPayload(window.ownidWidget);

          if (statusRS.data) {
            this.gigyaService.setData({ ownIdConnections: [{ ...statusRS.data }] });
          }
        }
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLogin(statusRS: any) {
    if (statusRS.sessionInfo) {
      document.cookie = `${ statusRS.sessionInfo.cookieName }=${ statusRS.sessionInfo.cookieValue }; path=/`;
      this.gigyaService.setOwnidUser(true, () => this.router.navigateByUrl('/notes'));
    }
  }
}
