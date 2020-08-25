"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("whatwg-fetch");
var RequestService = /** @class */ (function () {
    function RequestService(logger) {
        this.logger = logger;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    RequestService.prototype.post = function (url, data) {
        var _a;
        if (data === void 0) { data = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInfo("request: " + url);
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                mode: 'cors',
                                cache: 'no-cache',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                redirect: 'follow',
                                referrerPolicy: 'no-referrer',
                                body: JSON.stringify(data),
                            })];
                    case 1:
                        response = _b.sent();
                        if (response.status === 200) {
                            return [2 /*return*/, response.json()];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    return RequestService;
}());
exports.default = RequestService;
//# sourceMappingURL=request.service.js.map