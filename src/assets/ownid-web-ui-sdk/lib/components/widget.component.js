"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var base_component_1 = require("./base.component");
var link_button_component_1 = tslib_1.__importDefault(require("./common/link-button.component"));
var qr_component_1 = tslib_1.__importDefault(require("./common/qr.component"));
var configuration_service_1 = tslib_1.__importDefault(require("../services/configuration.service"));
var i_widget_interfaces_1 = require("../interfaces/i-widget.interfaces");
var translation_service_1 = tslib_1.__importDefault(require("../services/translation.service"));
var status_response_1 = require("./status-response");
var linked_component_1 = tslib_1.__importDefault(require("./common/linked.component"));
var WidgetComponent = /** @class */ (function (_super) {
    tslib_1.__extends(WidgetComponent, _super);
    function WidgetComponent(config, requestService, disableDesktop, disableMobile) {
        if (disableDesktop === void 0) { disableDesktop = false; }
        if (disableMobile === void 0) { disableMobile = false; }
        var _this = _super.call(this, config) || this;
        _this.config = config;
        _this.requestService = requestService;
        _this.disableDesktop = disableDesktop;
        _this.disableMobile = disableMobile;
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        _this.finalResponse = null;
        _this.returnError = null;
        _this.contexts = [];
        _this.postMessagesHandlerAttached = false;
        _this.isDestroyed = false;
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        _this.webappResolver = function () {
        };
        _this.onMessage = function (message) {
            if (message.data === 'ownid postMessages enabled') {
                clearTimeout(_this.statusTimeout);
            }
            if (message.data === 'ownid success') {
                _this.callStatus();
            }
        };
        _this.widgetReady = _this.init(config).then(function () {
            _this.render();
            _this.setRefreshLinkOrQR();
            if (!_this.isMobile()) {
                _this.setCallStatus();
            }
            if (config.toggleElement) {
                _this.addInfoIcon(config.toggleElement);
            }
        }, function (error) {
            // eslint-disable-next-line no-console
            console.error(error.message);
        });
        return _this;
    }
    WidgetComponent.prototype.init = function (config) {
        return this.getContext(config.URLPrefix || configuration_service_1.default.URLPrefix, config.data);
    };
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    WidgetComponent.prototype.getContext = function (contextUrl, data) {
        if (data === void 0) { data = null; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var contextData, contextResponse;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contextData = {
                            type: this.config.type || i_widget_interfaces_1.WidgetType.Register,
                            data: data,
                            qr: !this.isMobile(),
                            partial: !!this.config.partial,
                        };
                        return [4 /*yield*/, this.requestService.post(contextUrl, contextData)];
                    case 1:
                        contextResponse = _a.sent();
                        if (!contextResponse) {
                            throw new Error('No context data received');
                        }
                        this.cacheExpiration = contextResponse.expiration;
                        this.contexts.push(contextResponse);
                        return [2 /*return*/];
                }
            });
        });
    };
    WidgetComponent.prototype.render = function () {
        var _this = this;
        if (this.config.type === i_widget_interfaces_1.WidgetType.Link && this.contexts.find(function (_a) {
            var context = _a.context;
            return !context;
        })) {
            this.linked = new linked_component_1.default({ href: this.getStartUrl() });
            this.addChild(this.linked);
            return;
        }
        var lang = this.config.language || configuration_service_1.default.defaultLanguage;
        if (this.isMobile()) {
            if (this.disableMobile) {
                // eslint-disable-next-line no-console
                console.warn("Mobile rendering is disabled for " + this.config.type + " widget type");
                return;
            }
            var type = this.config.partial ? this.config.type + "-partial" : this.config.type;
            var mobileTitle = this.config.mobileTitle || translation_service_1.default.texts[lang][type].mobileTitle;
            this.link = new link_button_component_1.default({
                href: this.getStartUrl(),
                title: mobileTitle,
            });
            this.link.attachHandler('click', function () {
                if (_this.finalResponse) {
                    _this.callOnSuccess(_this.finalResponse);
                }
                _this.setCallStatus();
                clearTimeout(_this.refreshLinkTimeout);
                _this.attachPostMessagesHandler();
            });
            this.addChild(this.link);
            this.returnError = translation_service_1.default.texts[lang].errors.link;
        }
        else {
            if (this.disableDesktop) {
                // eslint-disable-next-line no-console
                console.warn("Desktop rendering is disabled for " + this.config.type + " widget type");
                return;
            }
            var type = this.config.partial ? this.config.type + "-partial" : this.config.type;
            this.qr = new qr_component_1.default({
                href: this.getStartUrl(),
                title: this.config.desktopTitle || translation_service_1.default.texts[lang][type].desktopTitle,
                subtitle: this.config.desktopSubtitle || translation_service_1.default.texts[lang][type].desktopSubtitle,
                type: type,
                lang: lang,
            });
            this.addChild(this.qr);
            this.returnError = translation_service_1.default.texts[lang].errors.qr;
        }
    };
    WidgetComponent.prototype.getStartUrl = function () {
        return this.contexts[this.contexts.length - 1].url;
    };
    WidgetComponent.prototype.getStatusUrl = function () {
        var prefix = (this.config.URLPrefix || configuration_service_1.default.URLPrefix).replace(/\/+$/, '');
        return "" + prefix + configuration_service_1.default.statusUrl;
    };
    WidgetComponent.prototype.getApproveUrl = function (context) {
        var prefix = (this.config.URLPrefix || configuration_service_1.default.URLPrefix).replace(/\/+$/, '');
        return "" + prefix + configuration_service_1.default.approveUrl.replace(':context', context);
    };
    WidgetComponent.prototype.setCallStatus = function () {
        var _this = this;
        this.statusTimeout = window.setTimeout(function () { return _this.callStatus(); }, this.config.statusInterval || configuration_service_1.default.statusTimeout);
    };
    WidgetComponent.prototype.callStatus = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var request, statusResponse, statuses, finishedIndex, processingIndex, cancelCb, waitingApprovalIndex, contextRS_1, pin, yesCb, noCb, _loop_1, this_1, i;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.isDestroyed || this.contexts.length <= 0) {
                            return [2 /*return*/, function () {
                                }];
                        }
                        request = this.contexts.map(function (_a) {
                            var context = _a.context, nonce = _a.nonce;
                            return ({
                                context: context,
                                nonce: nonce,
                            });
                        });
                        return [4 /*yield*/, this.requestService.post(this.getStatusUrl(), request)];
                    case 1:
                        statusResponse = (_b.sent());
                        if (!statusResponse) {
                            return [2 /*return*/, this.setCallStatus()];
                        }
                        statuses = statusResponse.map(function (x) { return x.status; });
                        finishedIndex = statuses.indexOf(status_response_1.ContextStatus.Finished);
                        if (finishedIndex >= 0) {
                            if (this.config.partial && this.config.type === i_widget_interfaces_1.WidgetType.Register && this.qr) {
                                this.qr.showDone();
                            }
                            this.contexts = [];
                            (_a = this.link) === null || _a === void 0 ? void 0 : _a.disableButton();
                            this.finalResponse = statusResponse[finishedIndex].payload.data;
                            this.callOnSuccess(this.finalResponse);
                            this.apiReply(this.finalResponse);
                        }
                        processingIndex = statuses.indexOf(status_response_1.ContextStatus.Started);
                        if (processingIndex >= 0) {
                            window.clearTimeout(this.refreshLinkTimeout);
                            if (this.qr) {
                                cancelCb = function () { return _this.reCreateWidget(); };
                                this.qr.showPending(cancelCb);
                            }
                        }
                        waitingApprovalIndex = statuses.indexOf(status_response_1.ContextStatus.WaitingForApproval);
                        if (waitingApprovalIndex >= 0) {
                            clearTimeout(this.refreshLinkTimeout);
                            contextRS_1 = this.contexts[waitingApprovalIndex];
                            pin = statusResponse[waitingApprovalIndex].payload.data.pin;
                            if (this.qr) {
                                yesCb = function () {
                                    var _a;
                                    _this.sendApprove(true, contextRS_1);
                                    (_a = _this.qr) === null || _a === void 0 ? void 0 : _a.showPending(function () { return _this.reCreateWidget(); });
                                };
                                noCb = function () {
                                    var _a;
                                    _this.sendApprove(false, contextRS_1);
                                    (_a = _this.qr) === null || _a === void 0 ? void 0 : _a.showPending();
                                    _this.reCreateWidget();
                                };
                                this.qr.showSecurityCheck(pin, yesCb, noCb);
                            }
                        }
                        _loop_1 = function (i) {
                            var item = this_1.contexts[i];
                            if (statusResponse.findIndex(function (x) { return x.context === item.context; }) < 0) {
                                this_1.contexts.splice(i, 1);
                            }
                        };
                        this_1 = this;
                        // remove expired items from contexts array
                        for (i = this.contexts.length; i--;) {
                            _loop_1(i);
                        }
                        return [2 /*return*/, this.setCallStatus()];
                }
            });
        });
    };
    WidgetComponent.prototype.sendApprove = function (approved, _a) {
        var context = _a.context, nonce = _a.nonce;
        this.requestService.post(this.getApproveUrl(context), {
            context: context,
            nonce: nonce,
            approved: approved,
        });
    };
    WidgetComponent.prototype.setRefreshLinkOrQR = function () {
        var _this = this;
        if (!this.cacheExpiration) {
            return;
        }
        this.refreshLinkTimeout = window.setTimeout(function () { return _this.refreshLinkOrQR(); }, this.cacheExpiration / 2);
    };
    WidgetComponent.prototype.refreshLinkOrQR = function () {
        var _this = this;
        this.init(this.config).then(function () {
            if (_this.qr) {
                _this.qr.update(_this.getStartUrl());
            }
            else if (_this.link) {
                _this.link.update(_this.getStartUrl());
            }
            _this.setRefreshLinkOrQR();
        }, function (error) {
            // eslint-disable-next-line no-console
            console.error(error.message);
        });
    };
    WidgetComponent.prototype.destroy = function () {
        this.isDestroyed = true;
        window.removeEventListener('message', this.onMessage);
        clearTimeout(this.statusTimeout);
        clearTimeout(this.refreshLinkTimeout);
        this.elements.forEach(function (element) { return element.destroy(); });
    };
    WidgetComponent.prototype.update = function (config) {
        this.elements.forEach(function (element) { return element.destroy(); });
        this.config = tslib_1.__assign(tslib_1.__assign({}, this.config), config);
        this.render();
    };
    WidgetComponent.prototype.attachPostMessagesHandler = function () {
        if (this.postMessagesHandlerAttached) {
            return;
        }
        this.postMessagesHandlerAttached = true;
        window.addEventListener('message', this.onMessage, false);
    };
    WidgetComponent.prototype.reCreateWidget = function () {
        var _this = this;
        this.contexts = [];
        this.widgetReady = this.init(this.config).then(function () {
            _this.destroy();
            _this.render();
            _this.setRefreshLinkOrQR();
            if (!_this.isMobile()) {
                _this.setCallStatus();
            }
        });
    };
    WidgetComponent.prototype.addInfoIcon = function (checkInput) {
        var _this = this;
        if (!checkInput.id) {
            // eslint-disable-next-line no-param-reassign
            checkInput.id = "ownid-toggle-check-" + Math.random();
        }
        var lang = this.config.language || configuration_service_1.default.defaultLanguage;
        var label = document.createElement('label');
        label.setAttribute('for', checkInput.id);
        label.setAttribute('class', 'ownid-label ownid-toggle');
        label.textContent = translation_service_1.default.texts[lang].common.labelText;
        checkInput.parentNode.insertBefore(label, checkInput.nextSibling);
        var infoIcon = document.createElement('span');
        infoIcon.setAttribute('style', 'margin-left:8px;cursor:pointer;position:relative');
        infoIcon.setAttribute('ownid-info-button', '');
        infoIcon.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#354a5f"><path d="M.333 7A6.67 6.67 0 0 1 7 .333 6.67 6.67 0 0 1 13.667 7 6.67 6.67 0 0 1 7 13.667 6.67 6.67 0 0 1 .333 7zM7 1.667C4.054 1.667 1.667 4.055 1.667 7S4.054 12.334 7 12.334 12.333 9.946 12.333 7 9.945 1.667 7 1.667zm0 3.667a1 1 0 1 0 0-2 1 1 0 1 0 0 2zm0 1.333c.368 0 .667.298.667.667V10c0 .368-.298.667-.667.667s-.667-.298-.667-.667V7.334c0-.368.298-.667.667-.667z"/></svg>' +
                '<div ownid-about-tooltip style="display: none;position: absolute;width: 220px;background: #FFFFFF;border: 1px solid #D5DADD;box-sizing: border-box;border-radius: 6px;font-size: 12px;line-height: 16px;padding: 16px 12px;bottom: 23px;left: -100px;cursor: default;">' +
                '<strong style="color: #0070F2">OwnID</strong> is a tool that allows you to register and login to the websites and apps you use everyday.</div>';
        var aboutTooltip = infoIcon.querySelector('[ownid-about-tooltip]');
        document.addEventListener('click', function (event) {
            var clickedInside = infoIcon.contains(event.target);
            if (!clickedInside) {
                aboutTooltip.style.display = 'none';
            }
        });
        infoIcon.querySelector('svg').addEventListener('click', function () {
            aboutTooltip.style.display = aboutTooltip.style.display === 'block' ? 'none' : 'block';
        });
        label.parentNode.insertBefore(infoIcon, label.nextSibling);
        var toggleElements = document.querySelectorAll(checkInput.getAttribute('ownid-toggle-rel'));
        checkInput.addEventListener('change', function (_a) {
            var target = _a.target;
            if (target.checked) {
                _this.config.element.style.display = 'block';
                toggleElements.forEach(function (toggleElement) {
                    var placeholder = document.createElement('ownid-toggle-placeholder');
                    placeholder.style.display = 'none';
                    toggleElement.parentNode.insertBefore(placeholder, toggleElement);
                    toggleElement.parentNode.removeChild(toggleElement);
                });
            }
            else {
                _this.config.element.style.display = 'none';
                document.querySelectorAll('ownid-toggle-placeholder').forEach(function (element, index) {
                    element.parentNode.insertBefore(toggleElements[index], element);
                    element.parentNode.removeChild(element);
                });
            }
        });
        this.config.element.style.display = 'none';
    };
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    WidgetComponent.prototype.callOnSuccess = function (finalResponse) {
        switch (this.config.type) {
            case i_widget_interfaces_1.WidgetType.Link:
                return this.config.onLink && this.config.onLink(finalResponse);
            case i_widget_interfaces_1.WidgetType.Login:
                return this.config.onLogin && this.config.onLogin(finalResponse);
            case i_widget_interfaces_1.WidgetType.Recover:
                return this.config.onRecover && this.config.onRecover(finalResponse);
            case i_widget_interfaces_1.WidgetType.Register:
            default:
                return this.config.onRegister && this.config.onRegister(finalResponse);
        }
    };
    WidgetComponent.prototype.openWebapp = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                window.open(this.getStartUrl());
                this.setCallStatus();
                clearTimeout(this.refreshLinkTimeout);
                this.attachPostMessagesHandler();
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.webappResolver = resolve;
                    })];
            });
        });
    };
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    WidgetComponent.prototype.apiReply = function (response) {
        this.webappResolver({
            error: null,
            data: response,
        });
    };
    return WidgetComponent;
}(base_component_1.BaseComponent));
exports.default = WidgetComponent;
//# sourceMappingURL=widget.component.js.map