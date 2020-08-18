"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var i_widget_interfaces_1 = require("../interfaces/i-widget.interfaces");
var gigya_link_widget_component_1 = tslib_1.__importDefault(require("./gigya-link-widget.component"));
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
    // @ts-ignore
    window.gigya = {
        accounts: {
            getJWT: jest.fn().mockImplementation(function (options) {
                options.callback({
                    errorCode: 0,
                    errorMessage: '',
                    id_token: 'jwt'
                });
            })
        }
    };
    beforeEach(function () {
        requestService = {};
        requestService.post = jest.fn().mockReturnValue(new Promise(function (resolve) {
            resolve({
                context: '123',
                nonce: '234',
                url: 'http://url',
            });
        }));
    });
    it('should render and add chile in mobile mode', function () {
        return new Promise(function (resolve) {
            navigator.userAgent =
                'Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36';
            var parent = document.createElement('div');
            document.body.appendChild(parent);
            var sut = new gigya_link_widget_component_1.default({
                element: parent,
                type: i_widget_interfaces_1.WidgetType.Link,
            }, requestService);
            sut.widgetReady.then(function () {
                expect(sut).not.toBeNull();
                expect(parent.children.length).toBe(1);
                expect(parent.children[0].tagName.toLowerCase()).toEqual('button');
                // @ts-ignore
                expect(window.gigya.accounts.getJWT).toBeCalledTimes(1);
                resolve(true);
            });
        });
    });
    it('should render in desktop mode', function () {
        return new Promise(function (resolve) {
            navigator.userAgent =
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9';
            var parent = document.createElement('div');
            document.body.appendChild(parent);
            var sut = new gigya_link_widget_component_1.default({
                element: parent,
                type: i_widget_interfaces_1.WidgetType.Link,
                URLPrefix: 'url',
            }, requestService);
            sut.widgetReady.then(function () {
                expect(sut).not.toBeNull();
                expect(parent.children.length).toBe(1);
                resolve(true);
            });
        });
    });
    it('should render and add chile in mobile mode2', function () {
        return new Promise(function (resolve) {
            navigator.userAgent =
                'Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36';
            var parent = document.createElement('div');
            document.body.appendChild(parent);
            console.error = jest.fn();
            // @ts-ignore
            window.gigya.accounts.getJWT = jest.fn().mockImplementationOnce(function (options) {
                options.callback({
                    errorCode: 1,
                    errorMessage: 'my fake error'
                });
            });
            var sut = new gigya_link_widget_component_1.default({
                element: parent,
                type: i_widget_interfaces_1.WidgetType.Link,
                URLPrefix: 'url',
            }, requestService);
            sut.getContext = jest.fn();
            sut.widgetReady.finally(function () {
                expect(parent.children.length).toBe(0);
                // @ts-ignore
                expect(window.gigya.accounts.getJWT).toBeCalledTimes(1);
                expect(sut.getContext).not.toBeCalled();
                expect(console.error).toBeCalledWith('Gigya.GetJWT -> 1: my fake error');
                resolve();
            });
        });
    });
});
//# sourceMappingURL=gigya-link-widget.component.test.js.map