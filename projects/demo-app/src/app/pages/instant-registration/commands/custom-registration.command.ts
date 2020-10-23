import { Injectable } from '@angular/core';

import { GigyaService } from '@services/gigya.service';

import { AppStore } from '../../../app.store';
import { IDataCommand } from '../../i-data-command';

interface GigyaRequestData {
  email: string;
  firstName: string;
  password: string;
  data?: {
    ownIdConnections: {
      keyHsh: string;
      pubKey: string;
    }[];
  };
}

@Injectable()
export class CustomRegistrationCommand
  implements IDataCommand<{ data: { [key: string]: string }; ownidWidget: unknown }> {
  constructor(private appStore: AppStore, private gigyaService: GigyaService) {}

  async execute({ data, ownidWidget }: { data: { [key: string]: string }; ownidWidget: unknown }) {
    this.appStore.formError$.next(null);

    const { email, firstName, password } = data;

    let gigyaRequestData: GigyaRequestData = { email, firstName, password };

    if (data.skipPassword) {
      // @ts-ignore
      const ownidResponse = await window.ownid.getOwnIDPayload(ownidWidget);

      if (ownidResponse.error) {
        this.appStore.formError$.next(ownidResponse.message);
        return;
      }

      gigyaRequestData = {
        email,
        firstName,
        // @ts-ignore
        password: window.ownid.generateOwnIDPassword(12),
        data: {
          ownIdConnections: [
            {
              ...ownidResponse.data,
            },
          ],
        },
      };
    }

    this.gigyaService.register(gigyaRequestData, (resp: { status: string; errorDetails: string }) => {
      if (resp.status === 'FAIL') {
        this.appStore.formError$.next(resp.errorDetails);
      }
    });
  }
}
