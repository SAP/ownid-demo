"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var link_button_component_1 = tslib_1.__importDefault(require("./link-button.component"));
describe('LinkButton Component', function () {
    var parent;
    beforeEach(function () {
        parent = document.createElement('div');
        document.body.appendChild(parent);
    });
    describe('ctor -> Render', function () {
        it('should create anchor element with options', function () {
            var _a;
            var options = { href: 'http://test-href', title: 'My test button' };
            var linkButton = new link_button_component_1.default(options);
            linkButton.appendToParent(parent);
            var button = parent.querySelector('button');
            expect(button).not.toBeNull();
            expect((_a = button.querySelector('span')) === null || _a === void 0 ? void 0 : _a.textContent).toEqual(options.title);
            // check if we have logo in anchor element
            expect(button.querySelector('svg')).not.toBeNull();
        });
        it('should create div element', function () {
            var options = { href: 'javascript:alert("hacked!!")', title: 'My test button' };
            var linkButton = new link_button_component_1.default(options);
            linkButton.appendToParent(parent);
            var div = parent.querySelector('div');
            expect(div).not.toBeNull();
        });
    });
    describe('Destroy()', function () {
        it('should remove LinkButton element from document', function () {
            var options = { href: 'http://test-href2', title: 'My test button' };
            var linkButton = new link_button_component_1.default(options);
            linkButton.appendToParent(parent);
            linkButton.destroy();
            expect(parent.querySelector('button')).toBeNull();
        });
    });
    describe('AttachHandler()', function () {
        it('should attach handler LinkButton element and trigger when event pops up', function () {
            var _a, _b;
            var options = { href: 'http://test-href2', title: 'My test button' };
            var linkButton = new link_button_component_1.default(options);
            linkButton.appendToParent(parent);
            var spyFn = jest.fn();
            linkButton.attachHandler('click', spyFn);
            (_a = parent.querySelector('button')) === null || _a === void 0 ? void 0 : _a.click();
            linkButton.disableButton();
            (_b = parent.querySelector('button')) === null || _b === void 0 ? void 0 : _b.click();
            expect(spyFn.mock.calls.length).toEqual(2);
        });
    });
    describe('disableButton()', function () {
        it('should set disabled to true', function () {
            var options = { href: 'test-href2', title: 'My test button' };
            var linkButton = new link_button_component_1.default(options);
            linkButton.disableButton();
            expect(linkButton['disabled']).toBeTruthy();
        });
    });
    describe('update()', function () {
        it('should set options.href', function () {
            var options = { href: 'http://test-href2', title: 'My test button' };
            var sut = new link_button_component_1.default(options);
            sut.update('http://test-href-updated');
            expect(sut.options.href).toEqual('http://test-href-updated');
        });
        it('should not set options.href if not valid url', function () {
            var options = { href: 'http://test-href2', title: 'My test button' };
            var sut = new link_button_component_1.default(options);
            sut.update('javascript:alert("hacked!!")');
            expect(sut.options.href).toEqual('http://test-href2');
        });
    });
});
//# sourceMappingURL=link-button.component.test.js.map