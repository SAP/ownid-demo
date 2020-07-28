import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { GigyaService } from '@services/gigya.service';

import { AppStore } from '../../../app.store';
import { IDataCommand } from '../../i-data-command';
import { environment } from '../../../../environments/environment';

const REGISTER_URL = environment.ownidURLPrefix.replace('ownid', 'not-ownid/register');

@Injectable()
export class CustomRegistrationCommand implements IDataCommand<{ data: { [key: string]: string }, ownidWidget: unknown }> {
  constructor(
    private router: Router,
    private appStore: AppStore,
    private httpClient: HttpClient,
    private gigyaService: GigyaService,
  ) {}

  async execute({ data, ownidWidget }: { data: { [key: string]: string }, ownidWidget: unknown }) {
    this.appStore.formError$.next(null);

    if (!data.skipPassword) {
      const { email, firstName, password } = data;
      this.gigyaService.register({ email, firstName, password }, (resp: { status: string, errorDetails: string }) => {
        if (resp.status === 'FAIL') {
          this.appStore.formError$.next(resp.errorDetails);
        }
      });
      return;
    }

    // @ts-ignore
    const ownidResponse = await window.ownid.getOwnIDPayload(ownidWidget);

    if (ownidResponse.error) {
      this.appStore.formError$.next(ownidResponse.message);
      return;
    }

    this.httpClient.post(REGISTER_URL, { ...data, pubKey: ownidResponse.data.publicKey })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .subscribe((statusRS: any) => {
        document.cookie = `${ statusRS.sessionInfo.cookieName }=${ statusRS.sessionInfo.cookieValue }; path=/`;

        this.router.navigateByUrl(`/notes`);

      }, (errorObject: { error: { error: string } }) => {
        this.appStore.formError$.next(errorObject.error.error);
      });

  }
}
