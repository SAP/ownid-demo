import BaseCommonComponent from './base-common.component';
declare type QrOptions = {
    title: string;
    subtitle: string;
    href: string;
    type: string;
    lang: string;
};
export default class Qr extends BaseCommonComponent<QrOptions> {
    private options;
    private qrCodeWrapper;
    private securityCheckShown;
    private spendingShown;
    constructor(options: QrOptions);
    protected render(options: QrOptions): HTMLElement;
    update(href: string): void;
    showSecurityCheck(pin: number, yesCb: () => void, noCb: () => void): void;
    showPending(cancelCb?: () => void): void;
    showDone(): void;
    private generateQRCode;
    private addOwnIDStyleTag;
    private pendingTemplate;
}
export {};
