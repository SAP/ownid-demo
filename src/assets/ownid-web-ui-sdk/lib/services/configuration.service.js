"use strict";
// todo: implement in correct way
Object.defineProperty(exports, "__esModule", { value: true });
var i_widget_interfaces_1 = require("../interfaces/i-widget.interfaces");
var ConfigurationService = /** @class */ (function () {
    function ConfigurationService() {
    }
    ConfigurationService.URLPrefix = '/ownid';
    ConfigurationService.statusUrl = "/status";
    ConfigurationService.approveUrl = "/:context/approve";
    ConfigurationService.statusTimeout = 2000;
    ConfigurationService.defaultLanguage = i_widget_interfaces_1.Languages.en;
    return ConfigurationService;
}());
exports.default = ConfigurationService;
//# sourceMappingURL=configuration.service.js.map