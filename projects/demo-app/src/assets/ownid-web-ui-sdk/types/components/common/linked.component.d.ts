import BaseCommonComponent from './base-common.component';
declare type LinkButtonOptions = {
    href: string;
};
export default class LinkedWidget extends BaseCommonComponent<LinkButtonOptions> {
    constructor(options: LinkButtonOptions);
    protected render(options: LinkButtonOptions): HTMLElement;
}
export {};
