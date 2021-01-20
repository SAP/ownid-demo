import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GigyaService } from '../../services/gigya.service';
import { AppStore } from '../../app.store';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;

  errors: string | null = null;

  private observer: MutationObserver;

  constructor(
    formBuilder: FormBuilder,
    private gigyaService: GigyaService,
    private router: Router,
    private elementRef: ElementRef,
    private appStore: AppStore,
  ) {
    this.form = formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });

    // @ts-ignore
    this.observer = new MutationObserver(() => window.ownidWidget?.recalculatePosition());

    this.observer.observe(this.elementRef.nativeElement, {
      attributes: false,
      childList: true,
      subtree: true,
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.errors = null;
      this.appStore.ignoreGigyaHandlers$.next(true);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.gigyaService.login(this.form.value, async (data: any) => {
        try {
          if (data.status === 'FAIL') {
            this.errors = data.errorDetails;
          } else {
            // @ts-ignore
            const statusRS = await window.ownid.getOwnIDPayload(window.ownidWidget);

            if (statusRS.data) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              this.gigyaService.getJwt((jwtData: any) => {
                const payload = JSON.stringify({ jwt: jwtData.id_token });
                // @ts-ignore
                // eslint-disable-next-line promise/catch-or-return,promise/always-return
                window.ownid.addOwnIDConnectionOnServer(window.ownidWidget, payload).then((widgetResponse) => {
                  if (widgetResponse?.error) {
                    this.gigyaService.logout(false);
                    this.errors = widgetResponse!.error;
                  }

                  return widgetResponse;
                });
              });
            }
          }
        } catch (error) {
          this.gigyaService.logout(false);
          throw error;
        } finally {
          setInterval(() => {
            this.appStore.ignoreGigyaHandlers$.next(false);
          });
        }
      });
    }
  }

  sendMagicLink() {
    const { email } = this.form.value;

    if (!email) return;

    // @ts-ignore
    // eslint-disable-next-line promise/catch-or-return,promise/always-return
    window.ownid!.sendMagicLink(email).then(() => {
      // eslint-disable-next-line no-alert
      window.alert(`Magic Link was sent to ${email}`);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLogin(statusRS: any) {
    if (statusRS.sessionInfo) {
      document.cookie = `${statusRS.sessionInfo.cookieName}=${statusRS.sessionInfo.cookieValue}; path=/`;
      this.gigyaService.setOwnidUser(true, () => this.router.navigateByUrl('/account'));
    }
  }
}
