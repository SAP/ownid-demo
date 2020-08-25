"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var request_service_1 = tslib_1.__importDefault(require("./request.service"));
describe('RequestService', function () {
    beforeEach(function () {
        window.fetch = jest.fn().mockReturnValue(new Promise(function (resolve) { return resolve({
            ok: true,
            status: 200,
            json: jest.fn().mockReturnValue({
                context: 'contextID',
                url: 'challengeUrlMock',
            }),
        }); }));
    });
    describe('post', function () {
        it('should call fetch with provided body', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var sut, res;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sut = new request_service_1.default();
                        return [4 /*yield*/, sut.post('url', { data: true })];
                    case 1:
                        res = _a.sent();
                        expect(window.fetch).toBeCalledWith('url', { body: '{"data":true}', cache: 'no-cache', headers: { 'Content-Type': 'application/json' }, method: 'POST', mode: 'cors', redirect: 'follow', referrerPolicy: 'no-referrer' });
                        expect(res).toEqual({
                            context: 'contextID',
                            url: 'challengeUrlMock',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call fetch with out provided body', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var sut, res;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sut = new request_service_1.default();
                        return [4 /*yield*/, sut.post('url')];
                    case 1:
                        res = _a.sent();
                        expect(window.fetch).toBeCalledWith('url', { body: '{}', cache: 'no-cache', headers: { 'Content-Type': 'application/json' }, method: 'POST', mode: 'cors', redirect: 'follow', referrerPolicy: 'no-referrer' });
                        expect(res).toEqual({
                            context: 'contextID',
                            url: 'challengeUrlMock',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return null', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var sut, res;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        window.fetch = jest.fn().mockReturnValue(new Promise(function (resolve) { return resolve({
                            ok: false,
                            json: jest.fn(),
                        }); }));
                        sut = new request_service_1.default();
                        return [4 /*yield*/, sut.post('url')];
                    case 1:
                        res = _a.sent();
                        expect(res).toEqual(null);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should log request url', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var logger, requestService;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger = {
                            logDebug: function () { },
                            logInfo: function () { },
                            logError: function () { }
                        };
                        logger.logInfo = jest.fn();
                        requestService = new request_service_1.default(logger);
                        // act
                        return [4 /*yield*/, requestService.post('url')];
                    case 1:
                        // act
                        _a.sent();
                        // assert
                        expect(logger.logInfo).toBeCalledWith('request: url');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=request.service.test.js.map