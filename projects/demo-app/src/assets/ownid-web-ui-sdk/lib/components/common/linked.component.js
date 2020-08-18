"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var base_common_component_1 = tslib_1.__importDefault(require("./base-common.component"));
var helper_service_1 = require("../../services/helper.service");
var LinkedWidget = /** @class */ (function (_super) {
    tslib_1.__extends(LinkedWidget, _super);
    function LinkedWidget(options) {
        return _super.call(this, options) || this;
    }
    LinkedWidget.prototype.render = function (options) {
        var element = document.createElement('div');
        if (!helper_service_1.validateUrl(options.href)) {
            // eslint-disable-next-line no-console
            console.error('URL validation failed');
            return element;
        }
        element.style.cssText = "padding: 20px;font-style: normal;font-weight: normal;font-size: 14px;line-height: 20px;color: #111D29;";
        element.innerHTML = "You have instant login enabled by <a style=\"color: #0070F2; text-decoration: none\" target=\"_blank\" href=\"" + options.href + "\">OwnID</a>.";
        return element;
    };
    return LinkedWidget;
}(base_common_component_1.default));
exports.default = LinkedWidget;
//# sourceMappingURL=linked.component.js.map