export declare type Options = {
    className?: string;
    id?: string;
    href: string;
};
export interface ICommonComponent {
    appendToParent(parent: HTMLElement): void;
    destroy(): void;
    ref: HTMLElement;
}
export default abstract class BaseCommonComponent<T> implements ICommonComponent {
    protected constructor(options: T);
    readonly ref: HTMLElement;
    protected abstract render(options: T): HTMLElement;
    attachHandler(event: string, handler: () => void): void;
    appendToParent(parent: HTMLElement): void;
    destroy(): void;
}
