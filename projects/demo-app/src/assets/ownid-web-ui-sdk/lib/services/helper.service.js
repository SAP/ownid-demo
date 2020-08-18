"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUrl = void 0;
function validateUrl(url) {
    var regex = /^https?:\/\/.+/;
    return regex.test(url);
}
exports.validateUrl = validateUrl;
//# sourceMappingURL=helper.service.js.map