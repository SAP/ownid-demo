"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var linked_component_1 = tslib_1.__importDefault(require("./linked.component"));
describe('LinkedWidget Component', function () {
    var parent;
    beforeEach(function () {
        parent = document.createElement('div');
        document.body.appendChild(parent);
    });
    describe('render', function () {
        it('should create div element with options', function () {
            var options = { href: 'http://test-href/' };
            var linkButton = new linked_component_1.default(options);
            linkButton.appendToParent(parent);
            var link = parent.querySelector('a');
            expect(link).not.toBeNull();
            expect(link.href).toEqual(options.href);
        });
        it('should create div element', function () {
            var options = { href: 'javascript:alert("hacked!!")' };
            var linkButton = new linked_component_1.default(options);
            linkButton.appendToParent(parent);
            var div = parent.querySelector('div');
            expect(div).not.toBeNull();
        });
    });
});
//# sourceMappingURL=linked.component.test.js.map