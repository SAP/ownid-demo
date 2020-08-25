"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var qr_component_1 = tslib_1.__importDefault(require("./qr.component"));
var i_widget_interfaces_1 = require("../../interfaces/i-widget.interfaces");
var parent = document.createElement('div');
document.body.appendChild(parent);
describe('ctor -> Render', function () {
    it('should create qr(button) element with options', function () {
        var options = {
            href: 'http://test-url',
            title: 'title',
            subtitle: 'subtitle',
            lang: 'en',
            type: i_widget_interfaces_1.WidgetType.Register
        };
        var sut = new qr_component_1.default(options);
        sut.appendToParent(parent);
        var qrCode = document.querySelector(".own-id-qr-code");
        expect(qrCode).not.toBeNull();
        var qrCodeImg = qrCode.querySelector("img");
        expect(qrCodeImg).not.toBeNull();
        sut.destroy();
    });
    it('should create qr element empty', function () {
        var options = {
            href: 'javascript:alert("hacked!!")',
            title: 'title',
            subtitle: 'subtitle',
            lang: 'en',
            type: i_widget_interfaces_1.WidgetType.Register
        };
        var sut = new qr_component_1.default(options);
        sut.appendToParent(parent);
        var div = document.querySelector("div");
        expect(div).not.toBeNull();
        sut.destroy();
    });
});
describe('update', function () {
    it('do nothing if wrapper is undefined', function () {
        var options = {
            href: 'http://test-url',
            title: 'title',
            subtitle: 'subtitle',
            lang: 'en',
            type: i_widget_interfaces_1.WidgetType.Register
        };
        var sut = new qr_component_1.default(options);
        sut.ref = null;
        sut.generateQRCode = jest.fn();
        sut.update('http://new-test-url');
        expect(sut.generateQRCode).not.toBeCalled();
    });
    it('do nothing if qrCode element is undefined', function () {
        var options = {
            href: 'http://test-url',
            title: 'title',
            subtitle: 'subtitle',
            lang: 'en',
            type: i_widget_interfaces_1.WidgetType.Register
        };
        var sut = new qr_component_1.default(options);
        sut.generateQRCode = jest.fn();
        sut.ref.querySelector = jest.fn().mockReturnValue(null);
        sut.update('http://new-test-url');
        expect(sut.generateQRCode).not.toBeCalled();
    });
    it('do nothing if not valid url', function () {
        var options = {
            href: 'http://test-url',
            title: 'title',
            subtitle: 'subtitle',
            lang: 'en',
            type: i_widget_interfaces_1.WidgetType.Register
        };
        var sut = new qr_component_1.default(options);
        sut.generateQRCode = jest.fn();
        sut.ref.querySelector = jest.fn().mockReturnValue(null);
        sut.update('new-test-url');
        expect(sut.generateQRCode).not.toBeCalled();
    });
    it('generate new qr code', function () {
        var options = {
            href: 'http://test-url',
            title: 'title',
            subtitle: 'subtitle',
            lang: 'en',
            type: i_widget_interfaces_1.WidgetType.Register
        };
        var sut = new qr_component_1.default(options);
        sut.generateQRCode = jest.fn().mockReturnValue('some-qr-code');
        sut.update('http://new-test-url');
        expect(sut.generateQRCode).toBeCalledWith('http://new-test-url');
    });
});
describe('Destroy()', function () {
    it('should remove qr(button) element from document', function () {
        var options = {
            href: 'http://test-url',
            title: 'title',
            subtitle: 'subtitle',
            lang: 'en',
            type: i_widget_interfaces_1.WidgetType.Register
        };
        var qr = new qr_component_1.default(options);
        qr.appendToParent(parent);
        qr.destroy();
        expect(document.querySelector(".own-id-qr-code")).toBeNull();
    });
});
describe('showSecurityCheck', function () {
    it('should remove qr(button) element from document', function () {
        var options = {
            href: 'http://test-url',
            title: 'title',
            subtitle: 'subtitle',
            lang: 'en',
            type: i_widget_interfaces_1.WidgetType.Register
        };
        var qr = new qr_component_1.default(options);
        qr.appendToParent(parent);
        var yesCb = jest.fn();
        var noCb = jest.fn();
        qr.showSecurityCheck(1234, yesCb, noCb);
        expect(parent.querySelector("[ownid-btn=\"yes\"]")).toBeTruthy();
        qr.showSecurityCheck(1234, yesCb, noCb);
        var yesBtn = parent.querySelector("[ownid-btn=\"yes\"]");
        yesBtn.click();
        var noBtn = parent.querySelector("[ownid-btn=\"no\"]");
        noBtn.click();
        expect(yesCb).toBeCalled();
        expect(noCb).toBeCalled();
    });
});
describe('showPending', function () {
    it('should set display style for pending element', function () {
        var options = {
            href: 'http://test-url',
            title: 'title',
            subtitle: 'subtitle',
            lang: 'en',
            type: i_widget_interfaces_1.WidgetType.Register
        };
        var qr = new qr_component_1.default(options);
        qr.appendToParent(parent);
        var yesCb = jest.fn();
        var noCb = jest.fn();
        qr.showSecurityCheck(1234, yesCb, noCb);
        qr.showPending();
        qr.showPending(function () { });
        var el = qr.ref.querySelector('[ownid-pending]');
        var cancelBtn = el.querySelector('[ownid-btn="cancel"]');
        cancelBtn.click();
        expect(el.style.display).toEqual('flex');
    });
    it('should not set display style for pending element', function () {
        var options = {
            href: 'https://test-url',
            title: '',
            subtitle: '',
            lang: 'en',
            type: i_widget_interfaces_1.WidgetType.Register
        };
        var qr = new qr_component_1.default(options);
        qr.appendToParent(parent);
        qr.showPending();
        var el = parent.querySelector('[ownid-pending]');
        expect(el.style.display).toEqual('none');
    });
});
describe('showDone', function () {
    it('should set display style for done element', function () {
        var options = {
            href: 'http://test-url',
            title: 'title',
            subtitle: 'subtitle',
            lang: 'en',
            type: i_widget_interfaces_1.WidgetType.Register
        };
        var qr = new qr_component_1.default(options);
        qr.appendToParent(parent);
        qr.showDone();
        var el = qr.ref.querySelector('[ownid-done]');
        expect(el.style.display).toEqual('flex');
    });
    it('should do nothing if there no done pane', function () {
        var options = {
            href: 'http://test-url',
            title: 'title',
            subtitle: 'subtitle',
            lang: 'en',
            type: i_widget_interfaces_1.WidgetType.Register
        };
        var qr = new qr_component_1.default(options);
        qr.appendToParent(parent);
        qr.showSecurityCheck(1234, function () { }, function () { });
        qr.showDone();
        var el = qr.ref.querySelector('[ownid-done]');
        expect(el).toEqual(null);
    });
});
//# sourceMappingURL=qr.component.test.js.map