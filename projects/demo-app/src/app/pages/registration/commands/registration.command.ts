import { Injectable } from '@angular/core';
import { GigyaService } from '../../../services/gigya.service';
import { AppStore } from '../../../app.store';
import { IDataCommand } from '../../i-data-command';

interface IGigyaRequestData {
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
interface IGigyaResponse {
  status: string;
  errorDetails: string;
  validationErrors?: IGigyaValidationError[];
}
interface IGigyaValidationError {
  errorCode: number;
  message: string;
  fieldName: string;
}

@Injectable()
export class RegistrationCommand implements IDataCommand<{ data: { [key: string]: string }; ownidWidget: unknown }> {
  constructor(private appStore: AppStore, private gigyaService: GigyaService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute({ data, ownidWidget }: { data: { [key: string]: string }; ownidWidget: any }) {
    this.appStore.formError$.next(null);
    this.appStore.formErrorItems$.next(null);

    const { email, firstName, password } = data;

    let gigyaRequestData: IGigyaRequestData = { email, firstName, password };

    if (!ownidWidget.disabled) {
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

    this.gigyaService.register(gigyaRequestData, (resp: IGigyaResponse) => {
      this.appStore.formError$.next(null);
      this.appStore.formErrorItems$.next(null);

      if (resp.status !== 'FAIL') return;

      if (!resp.validationErrors) {
        this.appStore.formError$.next(resp.errorDetails);
      } else if (resp.validationErrors.length === 1) {
        this.appStore.formError$.next(resp.validationErrors[0].message);
      } else {
        this.appStore.formError$.next(resp.errorDetails);

        const errors: string[] = [];
        resp.validationErrors.forEach((validationError: IGigyaValidationError) => {
          errors.push(validationError.message);
        });

        this.appStore.formErrorItems$.next(errors);
      }
    });
  }
}
