interface ITranslationsTexts {
    [key: string]: {
        [key: string]: {
            [key: string]: string;
        };
    };
}
export default class TranslationService {
    static readonly texts: ITranslationsTexts;
}
export {};
