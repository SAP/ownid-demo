interface ITranslationsTexts {
    [key: string]: {
        [key: string]: {
            mobileTitle: string;
            desktopTitle: string;
            desktopSubtitle: string;
        };
    };
}
export default class TranslationService {
    static readonly texts: ITranslationsTexts;
}
export {};
