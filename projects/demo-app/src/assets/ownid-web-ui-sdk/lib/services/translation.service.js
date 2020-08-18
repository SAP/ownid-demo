"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// todo: implement in correct way
var i_widget_interfaces_1 = require("../interfaces/i-widget.interfaces");
var strings_json_1 = tslib_1.__importDefault(require("../i18n/strings.json"));
var strings_ru_json_1 = tslib_1.__importDefault(require("../i18n/strings_ru.json"));
var TranslationService = /** @class */ (function () {
    function TranslationService() {
    }
    TranslationService.texts = (_a = {},
        _a[i_widget_interfaces_1.Languages.en] = strings_json_1.default,
        _a[i_widget_interfaces_1.Languages.ru] = strings_ru_json_1.default,
        _a);
    return TranslationService;
}());
exports.default = TranslationService;
//# sourceMappingURL=translation.service.js.map