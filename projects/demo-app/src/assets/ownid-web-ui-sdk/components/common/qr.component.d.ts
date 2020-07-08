import BaseCommonComponent from './base-common.component';
declare type QrOptions = {
    title: string;
    subtitle: string;
    href: string;
};
export default class Qr extends BaseCommonComponent<QrOptions> {
    private wrapper;
    private qrCodeWrapper;
    constructor(options: QrOptions);
    protected render(options: QrOptions): HTMLElement;
    update(href: string): void;
    private generateQRCode;
}
export {};
