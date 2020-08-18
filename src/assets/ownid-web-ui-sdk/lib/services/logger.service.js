"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var i_logger_interfaces_1 = require("../interfaces/i-logger.interfaces");
var LoggerDecorator = /** @class */ (function () {
    function LoggerDecorator(externalLogger, logLevel) {
        this.externalLogger = externalLogger;
        this.logLevel = logLevel;
    }
    LoggerDecorator.prototype.logDebug = function (message) {
        if (this.logLevel > i_logger_interfaces_1.LogLevel.debug) {
            return;
        }
        this.externalLogger.logDebug(message);
    };
    LoggerDecorator.prototype.logInfo = function (message) {
        if (this.logLevel > i_logger_interfaces_1.LogLevel.info) {
            return;
        }
        this.externalLogger.logInfo(message);
    };
    LoggerDecorator.prototype.logError = function (message) {
        this.externalLogger.logError(message);
    };
    return LoggerDecorator;
}());
exports.default = LoggerDecorator;
//# sourceMappingURL=logger.service.js.map