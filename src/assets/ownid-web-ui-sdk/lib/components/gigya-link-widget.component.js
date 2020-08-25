"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var widget_component_1 = tslib_1.__importDefault(require("./widget.component"));
var configuration_service_1 = tslib_1.__importDefault(require("../services/configuration.service"));
var GigyaLinkWidgetComponent = /** @class */ (function (_super) {
    tslib_1.__extends(GigyaLinkWidgetComponent, _super);
    function GigyaLinkWidgetComponent(config, requestService) {
        var _this = _super.call(this, config, requestService) || this;
        _this.config = config;
        _this.requestService = requestService;
        return _this;
    }
    GigyaLinkWidgetComponent.prototype.init = function (config) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.gigya.accounts.getJWT({
                callback: function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var errorText;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (data.errorCode !== 0) {
                                    errorText = "Gigya.GetJWT -> " + data.errorCode + ": " + data.errorMessage;
                                    // eslint-disable-next-line no-console
                                    console.error(errorText);
                                    reject(new Error(errorText));
                                }
                                return [4 /*yield*/, this.getContext(config.URLPrefix || configuration_service_1.default.URLPrefix, { jwt: data.id_token })];
                            case 1:
                                _a.sent();
                                resolve();
                                return [2 /*return*/];
                        }
                    });
                }); },
            });
        });
    };
    return GigyaLinkWidgetComponent;
}(widget_component_1.default));
exports.default = GigyaLinkWidgetComponent;
//# sourceMappingURL=gigya-link-widget.component.js.map