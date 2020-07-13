import BaseCommonComponent from './base-common.component';
declare type LinkButtonOptions = {
    title: string;
    href: string;
};
export default class LinkButton extends BaseCommonComponent<LinkButtonOptions> {
    private options;
    constructor(options: LinkButtonOptions);
    protected render(options: LinkButtonOptions): HTMLElement;
    update(href: string): void;
}
export {};
