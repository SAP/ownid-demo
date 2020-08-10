import { ILogger, LogLevel } from './i-logger.interfaces';
export declare enum WidgetType {
    Register = "register",
    Login = "login",
    Link = "link",
    Recover = "recover"
}
export declare enum Languages {
    en = "en",
    enGB = "en-GB",
    enUS = "en-US",
    ru = "ru",
    es = "es"
}
export interface IInitConfig {
    URLPrefix?: string;
    language?: Languages;
    statusInterval?: number;
    logger?: ILogger;
    logLevel?: keyof typeof LogLevel;
}
export interface IWidgetConfig {
    element: HTMLElement;
    type: WidgetType;
    language?: Languages;
    data?: unknown;
    URLPrefix?: string;
    mobileTitle?: string;
    desktopTitle?: string;
    desktopSubtitle?: string;
    statusInterval?: number;
    partial?: boolean;
    toggleElement?: HTMLElement;
    onLogin?: (response: unknown) => void;
    onRegister?: (response: unknown) => void;
    onLink?: (response: unknown) => void;
    onRecover?: (response: unknown) => void;
}
export interface IPartialConfig {
    language?: Languages;
    data?: unknown;
    mobileTitle?: string;
    desktopTitle?: string;
    desktopSubtitle?: string;
    statusInterval?: number;
    onLogin?: (response: unknown) => void;
    onRegister?: (response: unknown) => void;
    onLink?: (response: unknown) => void;
    onRecover?: (response: unknown) => void;
}
