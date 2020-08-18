"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var widget_component_1 = tslib_1.__importDefault(require("./components/widget.component"));
var request_service_1 = tslib_1.__importDefault(require("./services/request.service"));
var i_widget_interfaces_1 = require("./interfaces/i-widget.interfaces");
var gigya_link_widget_component_1 = tslib_1.__importDefault(require("./components/gigya-link-widget.component"));
var logger_service_1 = tslib_1.__importDefault(require("./services/logger.service"));
var i_logger_interfaces_1 = require("./interfaces/i-logger.interfaces");
var possibleChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
var OwnIDUiSdk = /** @class */ (function () {
    function OwnIDUiSdk() {
        this.config = {};
        this.isGigyaAdded = false;
    }
    OwnIDUiSdk.prototype.init = function (config) {
        if (config === void 0) { config = {}; }
        this.config = config;
        // init logger decorator
        if (config.logger) {
            // parse log level
            var logLevel = config.logLevel ? i_logger_interfaces_1.LogLevel[config.logLevel] : i_logger_interfaces_1.LogLevel.error;
            this.config.logger = new logger_service_1.default(config.logger, logLevel);
        }
    };
    OwnIDUiSdk.prototype.render = function (config) {
        if (!config.element) {
            // eslint-disable-next-line no-console
            console.error("Parent element wasn't found on the page");
            return null;
        }
        var desktopDisable = config.type === i_widget_interfaces_1.WidgetType.Link;
        var mobileDisable = config.type === i_widget_interfaces_1.WidgetType.Register && config.partial;
        return new widget_component_1.default(tslib_1.__assign(tslib_1.__assign({}, this.config), config), new request_service_1.default(this.config.logger), desktopDisable, mobileDisable);
    };
    OwnIDUiSdk.prototype.getOwnIDPayload = function (widget) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (widget.finalResponse) {
                    return [2 /*return*/, { error: null, data: widget.finalResponse }];
                }
                if (widget.returnError) {
                    return [2 /*return*/, { error: true, message: widget.returnError }];
                }
                return [2 /*return*/, widget.openWebapp()];
            });
        });
    };
    OwnIDUiSdk.prototype.generateOwnIDPassword = function (length) {
        var result = '';
        for (var i = length; i--;) {
            result += possibleChars[Math.floor(Math.random() * possibleChars.length)];
        }
        return result;
    };
    OwnIDUiSdk.prototype.renderLinkGigya = function (config, apiKey) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var gigya;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                if (!config.element) {
                    // eslint-disable-next-line no-console
                    console.error("Parent element wasn't found on the page");
                    return [2 /*return*/, null];
                }
                gigya = window.gigya;
                if (!apiKey && !gigya) {
                    // eslint-disable-next-line no-console
                    console.error("Gigya apiKey should be provided");
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, new Promise(function (resolve) {
                        var createWidgetResolve = function () {
                            resolve(new gigya_link_widget_component_1.default(tslib_1.__assign(tslib_1.__assign({}, _this.config), config), new request_service_1.default()));
                        };
                        if (!_this.isGigyaAdded && !gigya) {
                            _this.isGigyaAdded = true;
                            var src = "https://cdns.gigya.com/js/gigya.js?apikey=" + apiKey;
                            var scriptElement = document.createElement('script');
                            scriptElement.src = src;
                            scriptElement.addEventListener('load', createWidgetResolve);
                            document.head.appendChild(scriptElement);
                        }
                        else {
                            createWidgetResolve();
                        }
                    })];
            });
        });
    };
    return OwnIDUiSdk;
}());
exports.default = OwnIDUiSdk;
//# sourceMappingURL=ownid-web-ui-sdk.js.map