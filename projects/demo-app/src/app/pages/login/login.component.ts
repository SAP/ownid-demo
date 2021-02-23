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
      this.appStore.ignoreGigyaHandlers$.next(true);
      this.errors = null;

      this.gigyaService.login(this.form.value, async (data: any) => {
        try {
          if (data.status === 'FAIL') {
            this.errors = data.errorDetails;
          } else {
            // @ts-ignore
            const { succeededContext } = window.ownidWidget;
            // @ts-ignore
            const statusRS = await window.ownid.getOwnIDPayload(window.ownidWidget);

            if (statusRS.data) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              this.gigyaService.getJwt((jwtData: any) => {
                const payload = JSON.stringify({ jwt: jwtData.id_token });
                // @ts-ignore
                // eslint-disable-next-line promise/catch-or-return,promise/always-return
                window.ownid.addOwnIDConnectionOnServer(succeededContext, payload).then((widgetResponse) => {
                  if (widgetResponse?.error) {
                    this.gigyaService.logout(false);
                    this.errors = widgetResponse!.error;
                  } else {
                    this.router.navigateByUrl('/account');
                  }

                  return widgetResponse;
                });
              });
            } else {
              await this.router.navigateByUrl('/account');
            }
          }
        } catch (error) {
          this.gigyaService.logout(false);
          throw error;
        } finally {
          setTimeout(() => {
            this.appStore.ignoreGigyaHandlers$.next(false);
          });
        }
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLogin(statusRS: any) {
    if (statusRS.sessionInfo) {
      document.cookie = `${statusRS.sessionInfo.cookieName}=${statusRS.sessionInfo.cookieValue}; path=/`;
      this.gigyaService.setOwnidUser(true, () => this.router.navigateByUrl('/account'));
    }
  }

  onMagicLinkError(errorMessage: string) {
    this.errors = errorMessage;
  }
}
