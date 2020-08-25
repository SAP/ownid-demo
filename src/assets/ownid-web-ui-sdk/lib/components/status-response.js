"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextStatus = void 0;
var ContextStatus;
(function (ContextStatus) {
    ContextStatus[ContextStatus["Initiated"] = 1] = "Initiated";
    ContextStatus[ContextStatus["Started"] = 2] = "Started";
    ContextStatus[ContextStatus["WaitingForApproval"] = 3] = "WaitingForApproval";
    ContextStatus[ContextStatus["Approved"] = 4] = "Approved";
    ContextStatus[ContextStatus["Declined"] = 5] = "Declined";
    ContextStatus[ContextStatus["Finished"] = 99] = "Finished";
})(ContextStatus = exports.ContextStatus || (exports.ContextStatus = {}));
//# sourceMappingURL=status-response.js.map