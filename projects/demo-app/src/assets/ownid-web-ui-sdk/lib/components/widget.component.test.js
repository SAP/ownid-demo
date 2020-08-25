"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var widget_component_1 = tslib_1.__importDefault(require("./widget.component"));
var i_widget_interfaces_1 = require("../interfaces/i-widget.interfaces");
var status_response_1 = require("./status-response");
Object.defineProperty(navigator, 'userAgent', (function (value) { return ({
    bValue: value,
    get: function () {
        return this.bValue;
    },
    set: function (v) {
        this.bValue = v;
    },
}); })(navigator.userAgent));
describe('widget component', function () {
    var requestService;
    // eslint-disable-next-line no-console
    console.error = jest.fn();
    beforeEach(function () {
        requestService = {};
        requestService.post = jest.fn().mockReturnValueOnce(new Promise(function (resolve) {
            resolve({
                context: '123',
                nonce: '234',
                url: 'http://url',
                expiration: 10
            });
        })).mockReturnValue(new Promise(function (resolve) {
            resolve([
                {
                    "status": 1,
                    "context": "context1",
                    "payload": null
                },
                {
                    "status": 1,
                    "context": "context2",
                    "payload": null
                },
            ]);
        }));
    });
    it('should render and add child in mobile mode', function () {
        return new Promise(function (resolve) {
            navigator.userAgent =
                'Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36';
            var parent = document.createElement('div');
            window.clearTimeout = jest.fn();
            var sut = new widget_component_1.default({
                element: parent,
                type: i_widget_interfaces_1.WidgetType.Login,
                URLPrefix: 'url',
            }, requestService);
            sut.attachPostMessagesHandler();
            window.postMessage('ownid postMessages enabled', '*');
            window.postMessage('ownid success', '*');
            setTimeout(function () {
                expect(sut).not.toBeNull();
                expect(parent.children.length).toBe(1);
                expect(parent.children[0].tagName.toLowerCase()).toEqual('button');
                resolve(true);
            }, 100);
        });
    });
    it('should render and add chile in desktop mode', function () {
        return new Promise(function (resolve) {
            navigator.userAgent =
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9';
            var parent = document.createElement('div');
            document.body.appendChild(parent);
            var sut = new widget_component_1.default({
                element: parent,
                type: i_widget_interfaces_1.WidgetType.Login,
                URLPrefix: 'url',
            }, requestService);
            sut.widgetReady.then(function () {
                expect(sut).not.toBeNull();
                expect(parent.children.length).toBe(1);
                expect(parent.children[0].tagName.toLowerCase()).toEqual('div');
                resolve(true);
            });
        });
    });
    it('should render partial in desktop mode', function () {
        return new Promise(function (resolve) {
            navigator.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9';
            var toggleElement = document.createElement('span');
            var parent = document.createElement('div');
            document.body.appendChild(parent);
            document.body.appendChild(toggleElement);
            var sut = new widget_component_1.default({
                element: parent,
                type: i_widget_interfaces_1.WidgetType.Register,
                URLPrefix: 'url',
                partial: true,
                toggleElement: toggleElement,
            }, requestService);
            sut.widgetReady.then(function () {
                toggleElement.click();
                expect(sut).not.toBeNull();
                expect(parent.children.length).toBe(1);
                expect(parent.children[0].tagName.toLowerCase()).toEqual('div');
                resolve(true);
            });
        });
    });
    it('should not render', function () {
        return new Promise(function (resolve) {
            navigator.userAgent =
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9';
            // eslint-disable-next-line no-shadow
            requestService.post = jest
                .fn()
                .mockReturnValue(new Promise(function (resolve) { return resolve(null); }));
            var parent = document.createElement('div');
            var sut = new widget_component_1.default({
                element: parent,
                type: i_widget_interfaces_1.WidgetType.Login,
                URLPrefix: 'url',
            }, requestService);
            sut.widgetReady.finally(function () {
                expect(parent.children.length).toBe(0);
                resolve();
            });
        });
    });
    it('should not render in desktop mode when desktopDisabled = true', function () {
        return new Promise(function (resolve) {
            navigator.userAgent =
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9';
            // eslint-disable-next-line no-shadow
            requestService.post = jest
                .fn()
                .mockReturnValue(new Promise(function (resolve) { return resolve({}); }));
            var parent = document.createElement('div');
            document.body.appendChild(parent);
            console.warn = jest.fn();
            var type = i_widget_interfaces_1.WidgetType.Login;
            var sut = new widget_component_1.default({
                element: parent,
                type: type,
                URLPrefix: 'url',
            }, requestService, true);
            sut.widgetReady.then(function () {
                expect(console.warn).toBeCalledWith("Desktop rendering is disabled for " + type + " widget type");
                expect(parent.children.length).toBe(0);
                resolve();
            });
        });
    });
    it('should not render in mobile mode when mobileDisabled = true', function () {
        return new Promise(function (resolve) {
            navigator.userAgent =
                'Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36';
            // eslint-disable-next-line no-shadow
            requestService.post = jest
                .fn()
                .mockReturnValue(new Promise(function (resolve) { return resolve({}); }));
            var parent = document.createElement('div');
            document.body.appendChild(parent);
            console.warn = jest.fn();
            var type = i_widget_interfaces_1.WidgetType.Login;
            var sut = new widget_component_1.default({
                element: parent,
                type: type,
                URLPrefix: 'url',
            }, requestService, false, true);
            sut.widgetReady.then(function () {
                expect(console.warn).toBeCalledWith("Mobile rendering is disabled for " + type + " widget type");
                expect(parent.children.length).toBe(0);
                resolve();
            });
        });
    });
    it('should render and add linked widget if we receive accountUrl', function () {
        navigator.userAgent =
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9';
        var parent = document.createElement('div');
        window.clearTimeout = jest.fn();
        var sut = new widget_component_1.default({
            element: parent,
            type: i_widget_interfaces_1.WidgetType.Link,
            URLPrefix: 'url',
        }, requestService);
        sut.contexts = [{ expiration: 0, url: 'accountUrl' }];
        sut.render();
        expect(sut.linked).not.toBeFalsy();
    });
});
describe('callStatus', function () {
    var requestService;
    // eslint-disable-next-line no-console
    console.error = jest.fn();
    var contextResponse = {
        context: '123',
        nonce: '234',
        url: 'url',
        expiration: 10
    };
    var startedContextResponse = {
        status: status_response_1.ContextStatus.Initiated,
        context: "context1",
        payload: null
    };
    var processingContextResponse = {
        status: status_response_1.ContextStatus.Started,
        context: "context1",
        payload: null
    };
    var finishedContextResponse = {
        status: status_response_1.ContextStatus.Finished,
        context: "context1",
        payload: { data: { "a": "b" } }
    };
    var waitingApprovalContextResponse = {
        status: status_response_1.ContextStatus.WaitingForApproval,
        context: "context1",
        payload: { data: { "a": "b" } }
    };
    beforeEach(function () {
        navigator.userAgent = '';
        requestService = {};
        requestService.post = jest.fn().mockReturnValueOnce(new Promise(function (resolve) {
            resolve(contextResponse);
        })).mockReturnValue(new Promise(function (resolve) {
            resolve([startedContextResponse]);
        }));
    });
    it('should check status automatically for desktop version', function () {
        return new Promise(function (resolve) {
            navigator.userAgent =
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9';
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
            var sut = new widget_component_1.default({
                element: document.createElement('div'),
                type: i_widget_interfaces_1.WidgetType.Login,
                URLPrefix: 'url',
            }, requestService);
            sut.setCallStatus = jest.fn();
            sut.widgetReady.then(function () {
                expect(sut.setCallStatus).toBeCalled();
                resolve();
            });
        });
    });
    it('should not check status automatically for mobile version', function () {
        return new Promise(function (resolve) {
            navigator.userAgent =
                'Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36';
            var sut = new widget_component_1.default({
                element: document.createElement('div'),
                type: i_widget_interfaces_1.WidgetType.Login,
                URLPrefix: 'url'
            }, requestService);
            sut.setCallStatus = jest.fn();
            sut.widgetReady.then(function () {
                expect(sut.setCallStatus).not.toBeCalled();
                resolve();
            });
        });
    });
    it('should not schedule status check if we have no contexts to check', function () {
        return new Promise(function (resolve) {
            var sut = new widget_component_1.default({
                element: document.createElement('div'),
                type: i_widget_interfaces_1.WidgetType.Login,
                URLPrefix: 'url'
            }, requestService);
            sut.contexts = [];
            sut.setCallStatus = jest.fn();
            requestService.post = jest.fn().mockReturnValue(null);
            sut.callStatus().then(function () {
                expect(sut.setCallStatus).not.toBeCalled();
                resolve();
            });
        });
    });
    it('should schedule new status request if no response has been received', function () {
        return new Promise(function (resolve) {
            var sut = new widget_component_1.default({
                element: document.createElement('div'),
                type: i_widget_interfaces_1.WidgetType.Login,
                URLPrefix: 'url'
            }, requestService);
            sut.contexts = [{ context: "a", nonce: "b" }];
            sut.setCallStatus = jest.fn();
            requestService.post = jest.fn().mockReturnValue(null);
            sut.callStatus().then(function () {
                expect(sut.setCallStatus).toBeCalled();
                resolve();
            });
        });
    });
    it('should stop regenerating QR code if any context processing started', function () {
        return new Promise(function (resolve) {
            var sut = new widget_component_1.default({
                element: document.createElement('div'),
                type: i_widget_interfaces_1.WidgetType.Login,
                URLPrefix: 'url'
            }, requestService);
            sut.contexts = [{ context: "a", nonce: "b" }];
            sut.refreshLinkTimeout = jest.fn();
            window.clearTimeout = jest.fn();
            requestService.post = jest.fn().mockReturnValue(new Promise(function (resolve) { return resolve([processingContextResponse]); }));
            sut.qr = {
                showPending: jest.fn(),
            };
            sut.callStatus().then(function () {
                expect(window.clearTimeout).toBeCalledWith(sut.refreshLinkTimeout);
                resolve();
            });
        });
    });
    it('should show pin widget', function () {
        return new Promise(function (resolve) {
            var sut = new widget_component_1.default({
                element: document.createElement('div'),
                type: i_widget_interfaces_1.WidgetType.Login,
                URLPrefix: 'url'
            }, requestService);
            sut.contexts = [{ context: "a", nonce: "b" }];
            sut.qr = {
                showPending: jest.fn(),
                showSecurityCheck: jest.fn().mockImplementation(function (_, yesCBb, noCb) {
                    yesCBb();
                    noCb();
                }),
            };
            requestService.post = jest.fn().mockReturnValue(new Promise(function (resolve) { return resolve([waitingApprovalContextResponse]); }));
            sut.callStatus().then(function () {
                expect(sut.qr.showSecurityCheck).toBeCalled();
                resolve();
            });
        });
    });
    it('should start status check after clicking on button', function () {
        return new Promise(function (resolve) {
            navigator.userAgent = 'Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36';
            var parent = document.createElement('div');
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
            var sut = new widget_component_1.default({
                element: parent,
                type: i_widget_interfaces_1.WidgetType.Login,
                URLPrefix: 'url'
            }, requestService);
            sut.setCallStatus = jest.fn();
            sut.widgetReady.then(function () {
                var link = parent.children[0];
                expect(link).not.toBeNull();
                link.click();
                sut.finalResponse = {};
                link.click();
                expect(sut.setCallStatus).toBeCalled();
                resolve();
            });
        });
    });
    it('should include context to check status request', function () {
        return new Promise(function (resolve) {
            var sut = new widget_component_1.default({
                element: document.createElement('div'),
                type: i_widget_interfaces_1.WidgetType.Login,
                URLPrefix: 'url',
            }, requestService);
            requestService.post = jest.fn()
                .mockReturnValue(new Promise(function (resolve) { return resolve([startedContextResponse]); }));
            sut.widgetReady.then(function () {
                sut.callStatus().then(function () {
                    expect(requestService.post).toBeCalledWith('url/status', [{
                            context: contextResponse.context,
                            nonce: contextResponse.nonce
                        }]);
                    resolve();
                });
            });
        });
    });
    it('should call onLogin', function () {
        return new Promise(function (resolve) {
            var onLogin = jest.fn();
            requestService.post = jest.fn()
                .mockReturnValue(new Promise(function (resolve) { return resolve([startedContextResponse, finishedContextResponse]); }));
            var sut = new widget_component_1.default({
                element: document.createElement('div'),
                type: i_widget_interfaces_1.WidgetType.Login,
                URLPrefix: 'url',
                onLogin: onLogin,
            }, requestService);
            sut.contexts = [{ context: "a", nonce: "b" }];
            sut.callStatus().then(function () {
                expect(onLogin).toBeCalledWith({ "a": "b" });
                resolve();
            });
        });
    });
    it('should call onRegister', function () {
        return new Promise(function (resolve) {
            var onRegister = jest.fn();
            var sut = new widget_component_1.default({
                element: document.createElement('div'),
                type: i_widget_interfaces_1.WidgetType.Register,
                onRegister: onRegister
            }, requestService);
            sut.contexts = [{ context: "a", nonce: "b" }];
            requestService.post = jest.fn()
                .mockReturnValue(new Promise(function (resolve) { return resolve([startedContextResponse, finishedContextResponse]); }));
            sut.qr = {
                showDone: jest.fn(),
            };
            sut.callStatus().then(function () {
                expect(onRegister).toBeCalledWith({ "a": "b" });
                resolve();
            });
        });
    });
    it('should call onRegister if type is not set', function () {
        return new Promise(function (resolve) {
            var onRegister = jest.fn();
            var sut = new widget_component_1.default({
                element: document.createElement('div'),
                URLPrefix: 'url',
                onRegister: onRegister
            }, requestService);
            sut.contexts = [{ context: "a", nonce: "b" }];
            requestService.post = jest.fn()
                .mockReturnValue(new Promise(function (resolve) { return resolve([startedContextResponse, finishedContextResponse]); }));
            sut.callStatus().then(function () {
                expect(onRegister).toBeCalledWith({ "a": "b" });
                resolve();
            });
        });
    });
    it('should call onLink', function () {
        return new Promise(function (resolve) {
            var onLink = jest.fn();
            var sut = new widget_component_1.default({
                element: document.createElement('div'),
                URLPrefix: 'url',
                type: i_widget_interfaces_1.WidgetType.Link,
                onLink: onLink,
            }, requestService);
            sut.contexts = [{ context: "a", nonce: "b" }];
            requestService.post = jest.fn()
                .mockReturnValue(new Promise(function (resolve) { return resolve([startedContextResponse, finishedContextResponse]); }));
            sut.callStatus('url').then(function () {
                expect(onLink).toBeCalledWith({ "a": "b" });
                resolve();
            });
        });
    });
    it('should call onRecover', function () {
        return new Promise(function (resolve) {
            var onRecover = jest.fn();
            var sut = new widget_component_1.default({
                element: document.createElement('div'),
                URLPrefix: 'url',
                type: i_widget_interfaces_1.WidgetType.Recover,
                onRecover: onRecover,
            }, requestService);
            sut.contexts = [{ context: "a", nonce: "b" }];
            requestService.post = jest.fn()
                .mockReturnValue(new Promise(function (resolve) { return resolve([startedContextResponse, finishedContextResponse]); }));
            sut.callStatus('url').then(function () {
                expect(onRecover).toBeCalledWith({ "a": "b" });
                resolve();
            });
        });
    });
    it('should call setCallStatus', function () {
        return new Promise(function (resolve) {
            var sut = new widget_component_1.default({
                element: document.createElement('div'),
                type: i_widget_interfaces_1.WidgetType.Login,
                URLPrefix: 'url',
            }, requestService);
            sut.contexts = [{ context: "a", nonce: "b" }];
            sut.setCallStatus = jest.fn();
            requestService.post = jest.fn()
                .mockReturnValue(new Promise(function (resolve) { return resolve([startedContextResponse]); }));
            sut.callStatus().then(function () {
                expect(sut.setCallStatus).toBeCalledTimes(1);
                resolve();
            });
        });
    });
    it('should remove elements', function () {
        var sut = new widget_component_1.default({
            element: document.createElement('div'),
            onRegister: jest.fn(),
        }, requestService);
        sut.destroy();
        expect(sut.elements).toEqual([]);
    });
    it('should update config', function () {
        return new Promise(function (resolve) {
            var parent = document.createElement('div');
            var onRegister = jest.fn();
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
            var sut = new widget_component_1.default({
                element: parent,
                URLPrefix: 'url',
                type: i_widget_interfaces_1.WidgetType.Login,
                onRegister: onRegister,
            }, requestService);
            sut.data = { url: 'url' };
            requestService.post = jest.fn()
                .mockReturnValue(new Promise(function (resolve) { return resolve(contextResponse); }));
            sut.widgetReady.then(function () {
                sut.update({ language: i_widget_interfaces_1.Languages.ru });
                expect(sut.config.language).toEqual(i_widget_interfaces_1.Languages.ru);
                resolve();
            });
        });
    });
    describe('reCreateWidget', function () {
        it('should call destroy and render', function () {
            return new Promise(function (resolve) {
                var sut = new widget_component_1.default({
                    element: document.createElement('div'),
                    URLPrefix: 'url',
                }, requestService);
                sut.destroy = jest.fn();
                sut.render = jest.fn();
                sut.setCallStatus = jest.fn();
                sut.reCreateWidget();
                sut.widgetReady.then(function () {
                    expect(sut.destroy).toBeCalled();
                    expect(sut.render).toBeCalled();
                    expect(sut.setCallStatus).toBeCalled();
                    resolve();
                });
            });
        });
        it('should call destroy and render and not setCallStatus on desktop', function () {
            return new Promise(function (resolve) {
                var sut = new widget_component_1.default({
                    element: document.createElement('div'),
                    URLPrefix: 'url',
                }, requestService);
                sut.destroy = jest.fn();
                sut.render = jest.fn();
                sut.setCallStatus = jest.fn();
                sut.isMobile = jest.fn().mockReturnValue(true);
                sut.reCreateWidget();
                sut.widgetReady.then(function () {
                    expect(sut.destroy).toBeCalled();
                    expect(sut.render).toBeCalled();
                    expect(sut.setCallStatus).not.toBeCalled();
                    resolve();
                });
            });
        });
    });
});
describe('refresh link or qr', function () {
    var requestService;
    it('log error to console if init fails during link/qr refresh', function () {
        return new Promise(function (resolve) {
            var sut = new widget_component_1.default({
                element: document.createElement('div'),
                URLPrefix: 'url',
            }, requestService);
            sut.init = jest.fn().mockReturnValue(Promise.reject('error'));
            console.error = jest.fn();
            sut.refreshLinkOrQR();
            sut.widgetReady.then(function () {
                expect(console.error).toBeCalled();
                resolve();
            });
        });
    });
});
//# sourceMappingURL=widget.component.test.js.map