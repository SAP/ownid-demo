"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseCommonComponent = /** @class */ (function () {
    function BaseCommonComponent(options) {
        this.ref = this.render(options);
    }
    BaseCommonComponent.prototype.attachHandler = function (event, handler) {
        this.ref.addEventListener(event, handler);
    };
    BaseCommonComponent.prototype.appendToParent = function (parent) {
        parent.appendChild(this.ref);
    };
    BaseCommonComponent.prototype.destroy = function () {
        this.ref.parentNode.removeChild(this.ref);
    };
    return BaseCommonComponent;
}());
exports.default = BaseCommonComponent;
//# sourceMappingURL=base-common.component.js.map