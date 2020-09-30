import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { GigyaService } from '../../../services/gigya.service';

import { AppStore } from '../../../app.store';
import { IDataCommand } from '../../i-data-command';

@Injectable()
export class ResetPasswordCommand implements IDataCommand<{ passwordResetToken: string, password?: string }> {
  constructor(
    private appStore: AppStore,
    private gigyaService: GigyaService,
    private router: Router,
  ) {
  }

  async execute({ passwordResetToken, password }: { passwordResetToken: string, password?: string }) {
    this.appStore.formError$.next(null);

    // @ts-ignore
    const statusRS = await window.ownid.getOwnIDPayload(window.ownidWidget);

    if (statusRS.error) {
      this.appStore.formError$.next(statusRS.message);
      return;
    }

    if (statusRS.data) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.gigyaService.resetPassword({
      passwordResetToken,
      newPassword: password,
    }, async (data: { status: string, errorDetails: string }) => {
      if (data.status === 'FAIL') {
        this.appStore.formError$.next(data.errorDetails);
        return;
      }

      this.router.navigateByUrl('/login');
    });
  }
}
