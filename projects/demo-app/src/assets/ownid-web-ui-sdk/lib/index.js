"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ownid_web_ui_sdk_1 = tslib_1.__importDefault(require("./ownid-web-ui-sdk"));
window.ownid = window.ownid instanceof ownid_web_ui_sdk_1.default ? window.ownid : new ownid_web_ui_sdk_1.default();
if (window.ownidAsyncInit) {
    window.ownidAsyncInit();
}
else {
    // eslint-disable-next-line no-console
    console.log('OwnID sdk is loaded, ownidAsyncInit function was not found');
}
//# sourceMappingURL=index.js.map