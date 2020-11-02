import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface FIDO2base64 {
  clientDataJSON: string;
  credentialId: string | null;
  attestationObject?: string;
  authenticatorData?: string;
  signature?: string;
  type?: string;
}

const SUPPORTED_IOS_VERSION = 14;

@Component({
  selector: 'passwordless',
  templateUrl: './passwordless.component.html',
  styleUrls: ['./passwordless.component.scss'],
})
export class PasswordlessComponent {
  private url: string | null = null;

  private challenge: string | null = null;

  type: string | null = null;

  name: string;

  constructor(private actRoute: ActivatedRoute, private httpClient: HttpClient) {
    this.name = window.location.hostname;

    this.actRoute.queryParamMap
      .pipe(
        filter((params) => !!params.get('q') && !!params.get('t')),
        map((params) => ({ url: params.get('q') as string, type: params.get('t') as string })),
      )
      .subscribe(async ({ url, type }) => {
        const iosVersion = PasswordlessComponent.getIOSVersion();

        const fallback =
          !navigator.credentials ||
          !window.crypto ||
          (iosVersion && iosVersion < SUPPORTED_IOS_VERSION) ||
          PasswordlessComponent.isSamsungBrowser();

        if (fallback) {
          window.open(`//${url}`, '_self');
          return;
        }

        this.url = url;
        this.type = type;

        const decodedUrl = decodeURIComponent(url);
        const contextRegex = /.+ownid\/(.+)\/.+/g;
        const match = contextRegex.exec(decodedUrl);

        if (match) {
          const [, challenge] = match;
          this.challenge = challenge;
        } else {
          // eslint-disable-next-line no-console
          console.error('Context not found. Try again later.');
        }

        const credID = PasswordlessComponent.getCookie(`credID`);

        if (type === 'l' && !credID) {
          this.type = 'r'; // we are falling back to register flow if user not found
        }

        if (type === 'r' && credID) {
          const callbackMatch = /q=([^&]*)/.exec(decodedUrl);

          if (callbackMatch) {
            this.httpClient
              .post<{ isUserExists: boolean }>(`//${callbackMatch[1]}/is-fido2-user-exists/${credID}`, null)
              .subscribe((data: { isUserExists: boolean }) => {
                if (data.isUserExists) {
                  window.close();
                }
              });
          }
        }
      });
  }

  async onClick() {
    if (!this.challenge) {
      return;
    }

    const fido2Resp = this.type === 'r' ? await this.register(this.challenge) : await this.login(this.challenge);

    if (!fido2Resp) {
      // eslint-disable-next-line no-console
      console.error('FIDO2 response failed. Try again later.');
      window.close();
      return;
    }

    const data = JSON.stringify({ fido2: { ...fido2Resp, type: this.type } });

    window.open(`//${this.url}&data=${data}`, '_self');
  }

  async register(challenge: string): Promise<FIDO2base64 | null> {
    const publicKey = {
      challenge: PasswordlessComponent.utf8ToUint8Array(challenge),
      rp: { name: 'OwnID' },
      user: {
        id: window.crypto.getRandomValues(new Uint8Array(32)),
        name: 'Passwordless',
        displayName: 'Passwordless',
      },
      pubKeyCredParams: [
        {
          type: 'public-key' as PublicKeyCredentialType,
          alg: -7,
        },
      ],
      authenticatorSelection: {
        authenticatorAttachment: 'platform' as AuthenticatorAttachment,
        requireResidentKey: true,
        userVerification: 'preferred' as UserVerificationRequirement,
      },
    };

    try {
      const newCred = await navigator.credentials.create({ publicKey });

      PasswordlessComponent.setCookie(`credID`, newCred!.id, 365);

      // @ts-ignore
      const { attestationObject, clientDataJSON } = newCred.response;

      return {
        credentialId: newCred!.id,
        clientDataJSON: PasswordlessComponent.uint8ArrayToBase64(new Uint8Array(clientDataJSON)),
        attestationObject: PasswordlessComponent.uint8ArrayToBase64(new Uint8Array(attestationObject)),
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      this.handleFIDO2Exception(error);
    }

    return null;
  }

  async login(challenge: string): Promise<FIDO2base64 | null> {
    const credID = PasswordlessComponent.getCookie(`credID`);
    let allowCredentials: PublicKeyCredentialDescriptor[] = [];
    if (credID) {
      allowCredentials = [
        {
          id: PasswordlessComponent.base64ToUint8Array(credID),
          type: 'public-key',
          transports: ['internal'],
        },
      ];
    }

    const publicKey = {
      challenge: PasswordlessComponent.utf8ToUint8Array(challenge),
      authenticatorSelection: { authenticatorAttachment: 'platform' },
      allowCredentials,
    };

    try {
      const cred = await navigator.credentials.get({ publicKey });
      // @ts-ignore
      const { authenticatorData, signature, clientDataJSON } = cred!.response;

      return {
        credentialId: cred!.id,
        clientDataJSON: PasswordlessComponent.uint8ArrayToBase64(new Uint8Array(clientDataJSON)),
        authenticatorData: PasswordlessComponent.uint8ArrayToBase64(new Uint8Array(authenticatorData)),
        signature: PasswordlessComponent.uint8ArrayToBase64(new Uint8Array(signature)),
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      this.handleFIDO2Exception(error);
    }

    return null;
  }

  handleFIDO2Exception(error: DOMException) {
    if (error.code === DOMException.ABORT_ERR) {
      window.close();
      return;
    }

    window.open(`//${this.url}`, '_self');
  }

  static setCookie(name: string, value: string, days: number): void {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
  }

  static getCookie(name: string): string | null {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');

    // eslint-disable-next-line no-restricted-syntax
    for (let c of ca) {
      while (c.charAt(0) === ' ') c = c.slice(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.slice(nameEQ.length, c.length);
    }
    return null;
  }

  static base64ToUint8Array(str: string) {
    str = str.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
    // @ts-ignore
    return new Uint8Array(Array.prototype.map.call(atob(str), (c) => c.charCodeAt(0)));
  }

  static uint8ArrayToBase64(a: Uint8Array) {
    const base64string = btoa(String.fromCharCode(...a));
    return base64string.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  }

  static utf8ToUint8Array(str: string) {
    str = btoa(unescape(encodeURIComponent(str)));
    return PasswordlessComponent.base64ToUint8Array(str);
  }

  static uint8ArrayToUtf8(a: Uint8Array) {
    const str = PasswordlessComponent.uint8ArrayToBase64(a);
    return decodeURIComponent(escape(atob(str)));
  }

  static getIOSVersion() {
    const agent = window.navigator.userAgent;
    const start = agent.indexOf('OS');
    if (agent.includes('iPhone') && start > -1) {
      return window.Number(agent.slice(start + 3, start + 7).replace('_', '.'));
    }
    return 0;
  }

  static isSamsungBrowser(): boolean {
    return /samsung|sgh-[int]|gt-[in]|sm-[anptz]|shv-e|sch-[ijrs]|sph-l/i.test(navigator.userAgent);
  }
}
