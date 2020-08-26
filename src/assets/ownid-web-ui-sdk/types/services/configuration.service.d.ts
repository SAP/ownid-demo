import { Languages } from '../interfaces/i-widget.interfaces';
export default class ConfigurationService {
    static readonly URLPrefix = "/ownid";
    static readonly statusUrl = "/status";
    static readonly approveUrl = "/:context/approve";
    static readonly statusTimeout = 2000;
    static readonly defaultLanguage = Languages.en;
}