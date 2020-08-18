"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var logger_service_1 = tslib_1.__importDefault(require("./logger.service"));
var i_logger_interfaces_1 = require("../interfaces/i-logger.interfaces");
describe('LoggerDecorator', function () {
    function getExternalLog() {
        return {
            logDebug: function () { },
            logInfo: function () { },
            logError: function () { }
        };
    }
    describe('logDebug', function () {
        it('log debug if log level debug', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var externalLogger, logDecorator;
            return tslib_1.__generator(this, function (_a) {
                externalLogger = getExternalLog();
                externalLogger.logDebug = jest.fn();
                logDecorator = new logger_service_1.default(externalLogger, i_logger_interfaces_1.LogLevel.debug);
                logDecorator.logDebug('debug');
                expect(externalLogger.logDebug).toBeCalledWith('debug');
                return [2 /*return*/];
            });
        }); });
        it('does not log debug if log level is info', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var externalLogger, logDecorator;
            return tslib_1.__generator(this, function (_a) {
                externalLogger = getExternalLog();
                externalLogger.logDebug = jest.fn();
                logDecorator = new logger_service_1.default(externalLogger, i_logger_interfaces_1.LogLevel.info);
                logDecorator.logDebug('debug');
                expect(externalLogger.logDebug).toBeCalledTimes(0);
                return [2 /*return*/];
            });
        }); });
        it('does not log debug if log level is error', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var externalLogger, logDecorator;
            return tslib_1.__generator(this, function (_a) {
                externalLogger = getExternalLog();
                externalLogger.logDebug = jest.fn();
                logDecorator = new logger_service_1.default(externalLogger, i_logger_interfaces_1.LogLevel.error);
                logDecorator.logDebug('debug');
                expect(externalLogger.logDebug).toBeCalledTimes(0);
                return [2 /*return*/];
            });
        }); });
    });
    describe('logInfo', function () {
        it('log info if log level debug', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var externalLogger, logDecorator;
            return tslib_1.__generator(this, function (_a) {
                externalLogger = getExternalLog();
                externalLogger.logInfo = jest.fn();
                logDecorator = new logger_service_1.default(externalLogger, i_logger_interfaces_1.LogLevel.debug);
                logDecorator.logInfo('info');
                expect(externalLogger.logInfo).toBeCalledWith('info');
                return [2 /*return*/];
            });
        }); });
        it('log info if log level debug info', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var externalLogger, logDecorator;
            return tslib_1.__generator(this, function (_a) {
                externalLogger = getExternalLog();
                externalLogger.logInfo = jest.fn();
                logDecorator = new logger_service_1.default(externalLogger, i_logger_interfaces_1.LogLevel.info);
                logDecorator.logInfo('info');
                expect(externalLogger.logInfo).toBeCalledWith('info');
                return [2 /*return*/];
            });
        }); });
        it('does not log info if log level is error', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var externalLogger, logDecorator;
            return tslib_1.__generator(this, function (_a) {
                externalLogger = getExternalLog();
                externalLogger.logInfo = jest.fn();
                logDecorator = new logger_service_1.default(externalLogger, i_logger_interfaces_1.LogLevel.error);
                logDecorator.logInfo('info');
                expect(externalLogger.logInfo).toBeCalledTimes(0);
                return [2 /*return*/];
            });
        }); });
    });
    describe('logError', function () {
        it('log error if log level debug', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var externalLogger, logDecorator;
            return tslib_1.__generator(this, function (_a) {
                externalLogger = getExternalLog();
                externalLogger.logError = jest.fn();
                logDecorator = new logger_service_1.default(externalLogger, i_logger_interfaces_1.LogLevel.debug);
                logDecorator.logError('error');
                expect(externalLogger.logError).toBeCalledWith('error');
                return [2 /*return*/];
            });
        }); });
        it('log error if log level info', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var externalLogger, logDecorator;
            return tslib_1.__generator(this, function (_a) {
                externalLogger = getExternalLog();
                externalLogger.logError = jest.fn();
                logDecorator = new logger_service_1.default(externalLogger, i_logger_interfaces_1.LogLevel.info);
                logDecorator.logError('error');
                expect(externalLogger.logError).toBeCalledWith('error');
                return [2 /*return*/];
            });
        }); });
        it('log error if log level error', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var externalLogger, logDecorator;
            return tslib_1.__generator(this, function (_a) {
                externalLogger = getExternalLog();
                externalLogger.logError = jest.fn();
                logDecorator = new logger_service_1.default(externalLogger, i_logger_interfaces_1.LogLevel.error);
                logDecorator.logError('error');
                expect(externalLogger.logError).toBeCalledWith('error');
                return [2 /*return*/];
            });
        }); });
    });
});
//# sourceMappingURL=logger.service.test.js.map