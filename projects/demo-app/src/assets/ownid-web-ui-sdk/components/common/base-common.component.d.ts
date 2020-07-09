export declare type Options = {
    className?: string;
    id?: string;
    href: string;
};
export interface ICommonComponent {
    appendToParent(parent: HTMLElement): void;
    destroy(): void;
}
export default abstract class BaseCommonComponent<T> implements ICommonComponent {
    protected constructor(options: T);
    protected readonly ref: HTMLElement;
    protected abstract render(options: T): HTMLElement;
    attachHandler(event: string, handler: () => void): void;
    appendToParent(parent: HTMLElement): void;
    destroy(): void;
}
