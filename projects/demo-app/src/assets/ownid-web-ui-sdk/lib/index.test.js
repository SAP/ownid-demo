"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ownid_web_ui_sdk_1 = tslib_1.__importDefault(require("./ownid-web-ui-sdk"));
window.ownid = new ownid_web_ui_sdk_1.default();
window.ownidAsyncInit = function () { };
var i = tslib_1.__importStar(require("."));
describe("OwnIDUiSdk global", function () {
    it("should init window.ownid", function () {
        expect(i).not.toBeNull();
        expect(window.ownid).not.toBeNull();
        expect(window.ownid).toBeInstanceOf(ownid_web_ui_sdk_1.default);
    });
});
//# sourceMappingURL=index.test.js.map