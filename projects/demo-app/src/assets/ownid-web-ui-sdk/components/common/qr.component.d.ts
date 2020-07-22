import BaseCommonComponent from './base-common.component';
declare type QrOptions = {
    title: string;
    subtitle: string;
    href: string;
};
export default class Qr extends BaseCommonComponent<QrOptions> {
    private qrCodeWrapper;
    private securityCheckShown;
    constructor(options: QrOptions);
    protected render(options: QrOptions): HTMLElement;
    update(href: string): void;
    showSecurityCheck(pin: number, yesCb: () => void, noCb: () => void): void;
    showPending(cancelCb?: () => void): void;
    showDone(): void;
    private generateQRCode;
    private addOwnIDStyleTag;
}
export {};
