interface IDefaultTexts {
    [key: string]: {
        mobileTitle: string;
        desktopTitle: string;
        desktopSubtitle: string;
    };
}
export default class ConfigurationService {
    static readonly contextUrl = "/ownid/";
    static readonly statusUrl = "/ownId/:context/status";
    static readonly statusTimeout = 2000;
    static readonly defaultTexts: IDefaultTexts;
}
export {};
