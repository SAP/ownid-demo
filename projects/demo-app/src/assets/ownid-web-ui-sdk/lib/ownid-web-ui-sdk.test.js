"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ownid_web_ui_sdk_1 = tslib_1.__importDefault(require("./ownid-web-ui-sdk"));
var widget_component_1 = tslib_1.__importDefault(require("./components/widget.component"));
var i_widget_interfaces_1 = require("./interfaces/i-widget.interfaces");
var gigya_link_widget_component_1 = tslib_1.__importDefault(require("./components/gigya-link-widget.component"));
var request_service_1 = tslib_1.__importDefault(require("./services/request.service"));
describe('OwnIDUiSdk instances test', function () {
    var sdk = new ownid_web_ui_sdk_1.default();
    // eslint-disable-next-line no-console
    console.error = jest.fn();
    it('DummyClass is instantiable', function () {
        expect(sdk).toBeInstanceOf(ownid_web_ui_sdk_1.default);
    });
    describe('init', function () {
        it('init should set config', function () {
            var params = {
                URLPrefix: 'url',
                logger: {},
            };
            sdk.init(params);
            expect(sdk.config).toEqual({
                URLPrefix: 'url',
                logger: {
                    externalLogger: {},
                    logLevel: 3,
                }
            });
        });
        it('init should set config (more options)', function () {
            var params = {
                URLPrefix: 'url',
                logger: {},
                logLevel: 'info',
            };
            sdk.init(params);
            expect(sdk.config).toEqual({
                URLPrefix: 'url',
                logLevel: 'info',
                logger: {
                    externalLogger: {},
                    logLevel: 2,
                }
            });
        });
        it('should set config to {}', function () {
            sdk.init();
            expect(sdk.config).toEqual({});
        });
    });
    describe('render', function () {
        it('render should call WidgetComponent', function () {
            var params = {
                element: document.createElement('div'),
                type: i_widget_interfaces_1.WidgetType.Login,
            };
            var sut = sdk.render(params);
            expect(sut).toBeInstanceOf(widget_component_1.default);
        });
        it('render should call WidgetComponent for partial', function () {
            var params = {
                element: document.createElement('div'),
                type: i_widget_interfaces_1.WidgetType.Register,
                partial: true,
            };
            var sut = sdk.render(params);
            expect(sut).toBeInstanceOf(widget_component_1.default);
        });
        it('render should return null', function () {
            var params = {
                // @ts-ignore
                element: null,
                type: i_widget_interfaces_1.WidgetType.Login,
            };
            var sut = sdk.render(params);
            expect(sut).toBe(null);
        });
    });
    describe('  describe(\'init\', () => {\n', function () {
        it('renderLinkGigya should return null if no element', function () {
            return new Promise(function (resolve) {
                var params = {
                    element: null,
                    type: i_widget_interfaces_1.WidgetType.Link,
                };
                // @ts-ignore
                sdk.renderLinkGigya(params, '3_s5-gLs4aLp5FXluP8HXs7_JN40XWNlbvYWVCCkbNCqlhW6Sm5Z4tXGGsHcSJYD3W')
                    .then(function (windget) {
                    expect(windget).toBeNull();
                })
                    .finally(function () {
                    resolve();
                });
            });
        });
        it('renderLinkGigya should return null if no api key', function () {
            return new Promise(function (resolve) {
                var params = {
                    element: document.createElement('div'),
                    type: i_widget_interfaces_1.WidgetType.Link,
                };
                // @ts-ignore
                sdk.renderLinkGigya(params, null)
                    .then(function (windget) {
                    expect(windget).toBeNull();
                })
                    .finally(function () {
                    resolve();
                });
            });
        });
        it('renderLinkGigya should call GigyaLinkWidgetComponent and use Gigya JS SDK', function () {
            return new Promise(function (resolve, reject) {
                var params = {
                    element: document.createElement('div'),
                    type: i_widget_interfaces_1.WidgetType.Link,
                };
                sdk.isGigyaAdded = true;
                // @ts-ignore
                window.gigya = {
                    accounts: {
                        getJWT: function () {
                        }
                    }
                };
                sdk.renderLinkGigya(params, '')
                    .then(function (windget) {
                    expect(windget).toBeInstanceOf(gigya_link_widget_component_1.default);
                    // @ts-ignore
                    expect(window.gigya).not.toBeNull();
                    resolve();
                })
                    .catch(function () { return reject; });
            });
        });
        it('renderLinkGigya should call GigyaLinkWidgetComponent and load Gigya JS SDK', function () {
            return new Promise(function (resolve, reject) {
                var params = {
                    element: document.createElement('div'),
                    type: i_widget_interfaces_1.WidgetType.Link,
                };
                // @ts-ignore
                window.gigya = null;
                sdk.isGigyaAdded = false;
                var scriptElement = document.createElement('script');
                scriptElement.addEventListener = jest.fn().mockImplementationOnce(function (event, callback) {
                    if (event === 'load') {
                        // @ts-ignore
                        window.gigya = {
                            accounts: {
                                getJWT: function () {
                                }
                            }
                        };
                        callback();
                    }
                });
                document.createElement = jest.fn().mockImplementationOnce(function (tag) {
                    if (tag === 'script') {
                        return scriptElement;
                    }
                    return null;
                });
                sdk.renderLinkGigya(params, '3_s5-gLs4aLp5FXluP8HXs7_JN40XWNlbvYWVCCkbNCqlhW6Sm5Z4tXGGsHcSJYD3W')
                    .then(function (widget) {
                    expect(widget).toBeInstanceOf(gigya_link_widget_component_1.default);
                    expect(sdk.isGigyaAdded).toBeTruthy();
                    resolve();
                }).catch(function () { return reject; });
            });
        });
    });
    describe('getOwnIDPayload', function () {
        var widget;
        beforeEach(function () {
            var params = {
                element: document.createElement('div'),
                type: i_widget_interfaces_1.WidgetType.Login,
            };
            widget = new widget_component_1.default(params, new request_service_1.default());
        });
        it('should call widget.openWebapp', function () {
            widget.openWebapp = jest.fn();
            sdk.getOwnIDPayload(widget);
            expect(widget.openWebapp).toBeCalled();
        });
        it('should return response', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var res;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        widget.finalResponse = { response: true };
                        return [4 /*yield*/, sdk.getOwnIDPayload(widget)];
                    case 1:
                        res = _a.sent();
                        expect(res).toEqual({ error: null, data: { response: true } });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return an error', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var res;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        widget.returnError = 'show error';
                        return [4 /*yield*/, sdk.getOwnIDPayload(widget)];
                    case 1:
                        res = _a.sent();
                        expect(res).toEqual({ error: true, message: 'show error' });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('generateOwnIDPassword', function () {
        it('should create random string with defined length', function () {
            var res = sdk.generateOwnIDPassword(10);
            expect(res.length).toEqual(10);
        });
    });
});
//# sourceMappingURL=ownid-web-ui-sdk.test.js.map