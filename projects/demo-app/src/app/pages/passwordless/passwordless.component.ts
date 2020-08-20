import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

interface FIDO2base64 {
  clientDataJSON: string;
  userId: string;
  attestationObject?: string;
  credentialId?: string | null;
  authenticatorData?: string;
  signature?: string;
  type?: string;
}

@Component({
  selector: 'passwordless',
  template: '',
})
export class PasswordlessComponent {
  constructor(private actRoute: ActivatedRoute) {
    this.actRoute.queryParamMap
      .pipe(
        filter((params) => !!params.get('q') && !!params.get('t')),
        map((params) => ({ url: params.get('q') as string, type: params.get('t') as string })),
      )
      .subscribe(async ({ url, type }) => {
        if (!navigator.credentials || !window.crypto) {
          window.open(`//${ url }`, '_self');
          return;
        }

        let challenge;
        const decodedUrl = decodeURIComponent(url);
        const contextRegex = /.+ownid\/(.+)\/.+/g;
        const match = contextRegex.exec(decodedUrl);

        if (match) {
          [, challenge] = match;
        } else {
          // eslint-disable-next-line no-console
          console.error('Context not found. Try again later.')
          return;
        }

        const fido2Resp = type === 'r'
          ? await this.register(challenge)
          : await this.login(challenge);

        if (!fido2Resp) {
          // eslint-disable-next-line no-console
          console.error('FIDO2 response failed. Try again later.')
          return;
        }

        const data = JSON.stringify({ fido2: { ...fido2Resp, type } });

        window.open(`//${ url }&data=${data}`, '_self');
      });
  }

  async register(challenge: string): Promise<FIDO2base64 | null> {
    const publicKey = {
      challenge: PasswordlessComponent.utf8ToUint8Array(challenge),
      rp: { name: 'OwnID' },
      user: {
        id: window.crypto.getRandomValues(new Uint8Array(32)),
        name: 'Passwordless',
        displayName: 'Passwordless'
      },
      pubKeyCredParams: [{
        type: 'public-key' as PublicKeyCredentialType,
        alg: -7
      }],
      authenticatorSelection: {
        authenticatorAttachment: 'platform' as AuthenticatorAttachment,
        requireResidentKey: true,
        userVerification: 'preferred' as UserVerificationRequirement
      }
    }

    try {
      const newCred = await navigator.credentials.create({ publicKey });

      if (newCred!.id) {
        PasswordlessComponent.setCookie(`credID`, newCred!.id, 365);
      }

      // @ts-ignore
      const { attestationObject, clientDataJSON } = newCred.response;
      const userId = PasswordlessComponent.uint8ArrayToBase64(publicKey.user.id);

      return {
        userId,
        clientDataJSON: PasswordlessComponent.uint8ArrayToBase64(new Uint8Array(clientDataJSON)),
        attestationObject: PasswordlessComponent.uint8ArrayToBase64(new Uint8Array(attestationObject)),
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
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
          transports: ['internal']
        }
      ]
    }

    const publicKey = {
      challenge: PasswordlessComponent.utf8ToUint8Array(challenge),
      allowCredentials,
    }

    try {
      const cred = await navigator.credentials.get({ publicKey });
      // @ts-ignore
      const { authenticatorData, signature, clientDataJSON, userHandle } = cred!.response;

      return {
        credentialId: cred!.id,
        userId: PasswordlessComponent.uint8ArrayToBase64(new Uint8Array(userHandle)),
        clientDataJSON: PasswordlessComponent.uint8ArrayToBase64(new Uint8Array(clientDataJSON)),
        authenticatorData: PasswordlessComponent.uint8ArrayToBase64(new Uint8Array(authenticatorData)),
        signature: PasswordlessComponent.uint8ArrayToBase64(new Uint8Array(signature)),
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    return null;
  }

  static setCookie(name: string, value: string, days: number): void {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = `; expires=${ date.toUTCString() }`;
    }
    document.cookie = `${ name }=${ value || '' }${ expires }; path=/`;
  }

  static getCookie(name: string): string | null {
    const nameEQ = `${ name }=`;
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
}







