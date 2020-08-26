"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var qrcode_generator_1 = tslib_1.__importDefault(require("qrcode-generator"));
var base_common_component_1 = tslib_1.__importDefault(require("./base-common.component"));
var helper_service_1 = require("../../services/helper.service");
var translation_service_1 = tslib_1.__importDefault(require("../../services/translation.service"));
var Qr = /** @class */ (function (_super) {
    tslib_1.__extends(Qr, _super);
    function Qr(options) {
        var _this = _super.call(this, options) || this;
        _this.options = options;
        _this.qrCodeWrapper = null;
        _this.securityCheckShown = false;
        _this.spendingShown = false;
        return _this;
    }
    Qr.prototype.render = function (options) {
        var wrapper = document.createElement('div');
        if (!helper_service_1.validateUrl(options.href)) {
            // eslint-disable-next-line no-console
            console.error('URL validation failed');
            return wrapper;
        }
        wrapper.style.position = 'relative';
        var styles = document.getElementById('OwnID-styles');
        if (!styles) {
            this.addOwnIDStyleTag('OwnID-styles');
        }
        var title = options.title
            ? "<div style=\"font-family:'SF Compact Text',sans-serif;font-weight:bold;font-size:20px;line-height:32px;margin-bottom:4px;\">" + options.title + "</div>"
            : '';
        var subTitle = options.subtitle
            ? "<div style=\"font-family:'SF Compact Text',sans-serif;font-weight:500;font-size:16px;line-height:24px;\">" + options.subtitle + "</div>"
            : '';
        var onlyTitleFx = title && !subTitle ? '<div style="height: 25px"></div>' : '';
        var pendingTexts = {
            message: translation_service_1.default.texts[options.lang][options.type].pendingMessage,
            button: translation_service_1.default.texts[options.lang][options.type].pendingButton,
        };
        var doneMessage = translation_service_1.default.texts[options.lang][options.type].doneMessage;
        wrapper.innerHTML = "\n      <div style=\"display:flex;padding:15px;background:#fff;border-radius:10px\">\n        <div class=\"own-id-qr-code\" style=\"margin-right:25px\">" + this.generateQRCode(options.href) + "</div>\n        <div style=\"display:flex;flex-direction:column;justify-content:space-between;flex:1;\">\n          " + onlyTitleFx + "\n          <div>" + title + subTitle + "</div>\n          <div><a href=\"https://ownid.com/\" style=\"text-decoration:none;display:flex;justify-content:flex-end;\"><span style=\"font-family:'SF Pro Text',sans-serif;font-weight:500;font-size:12px;line-height:24px;color:#ACACAC;margin-right:5px;\">What is this?</span><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"#030303\"><path d=\"M4.16 8.322a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776L9.108.368c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776L5.052 7.95a1.25 1.25 0 0 1-.891.371zm7.116-1.286a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776l1.662-1.657c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776l-1.675 1.67a1.24 1.24 0 0 1-.878.358zm-7.154 7.132a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776l4.242-4.23c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776l-4.242 4.23a1.23 1.23 0 0 1-.891.371zm2.9 2.877a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776l1.795-1.8c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776l-1.795 1.8c-.24.252-.56.37-.9.37zm4.708-4.695a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776l4.1-4.096c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776l-4.1 4.096c-.24.252-.56.37-.9.37zM1.25 11.2A1.25 1.25 0 0 0 2.5 9.965a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 1.25 1.246zM9.906 20a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776l5.944-5.925c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776l-5.944 5.926a1.25 1.25 0 0 1-.891.371zm8.844-8.815a1.25 1.25 0 1 0-1.25-1.246 1.25 1.25 0 0 0 1.25 1.246z\"/></svg></a></div>\n        </div>\n      </div>\n      " + this.pendingTemplate(pendingTexts) + "\n      <div ownid-done style=\"display:none; position: absolute;top: 0;background: #FFF;width: 100%;height: 100%;justify-content: space-around;align-items: center;\">\n        <svg style=\"margin: 0 48px;flex: 0 0 auto;\" xmlns=\"http://www.w3.org/2000/svg\" width=\"64\" height=\"64\" fill=\"#5dc122\"><path d=\"M32 0A32 32 0 0 0 9.373 54.627 32 32 0 0 0 64 32c-.01-8.484-3.383-16.618-9.383-22.617A32.04 32.04 0 0 0 32 0zm0 59.43a27.43 27.43 0 0 1-19.395-46.824A27.43 27.43 0 0 1 59.429 32 27.46 27.46 0 0 1 32 59.429zm14.783-40.372L25.36 40.414l-7.592-7.568c-.213-.22-.467-.395-.748-.515a2.32 2.32 0 0 0-.9-.186 2.31 2.31 0 0 0-.893.171 2.32 2.32 0 0 0-.757.502 2.3 2.3 0 0 0-.504.755 2.29 2.29 0 0 0 .016 1.777 2.3 2.3 0 0 0 .517.746l9.222 9.192a2.31 2.31 0 0 0 3.26 0l23.054-22.98c.42-.433.652-1.014.647-1.617a2.29 2.29 0 0 0-.675-1.605 2.31 2.31 0 0 0-3.232-.028z\"/></svg>\n        <div style=\"font-weight: bold;font-size: 14px;line-height: 20px;color: #000000;\">" + doneMessage + "</div>\n      </div>";
        return wrapper;
    };
    Qr.prototype.update = function (href) {
        if (!helper_service_1.validateUrl(href)) {
            // eslint-disable-next-line no-console
            console.error('URL validation failed');
            return;
        }
        if (this.ref && !this.qrCodeWrapper) {
            this.qrCodeWrapper = this.ref.querySelector('.own-id-qr-code');
        }
        if (!this.qrCodeWrapper) {
            return;
        }
        this.qrCodeWrapper.innerHTML = this.generateQRCode(href);
    };
    Qr.prototype.showSecurityCheck = function (pin, yesCb, noCb) {
        if (this.securityCheckShown) {
            return;
        }
        this.securityCheckShown = true;
        var pendingTexts = {
            message: translation_service_1.default.texts[this.options.lang][this.options.type].pendingMessage,
            button: translation_service_1.default.texts[this.options.lang][this.options.type].pendingButton,
        };
        var _a = translation_service_1.default.texts[this.options.lang].verification, title = _a.title, message = _a.message, yesButton = _a.yesButton, noButton = _a.noButton;
        this.ref.innerHTML = "\n      <div style=\"padding:15px;background:#fff;border-radius:10px\">\n        <section style=\"display: flex;justify-content: space-between;\">\n          <section style=\"display: flex;justify-content: center;align-items: center;flex: 50% 0 0;font-size: 32px;line-height: 36px;text-align: center;letter-spacing: 12px;\">" + pin + "</section>\n          <section style=\"font-size: 14px;line-height: 20px;\">\n            <div style=\"font-weight: bold\">" + title + "</div>\n            <div style=\"margin-top: 4px\">" + message + "</div>\n          </section>\n        </section>\n        <section style=\"display: flex;justify-content: center;margin-top: 12px\">\n          <button ownid-btn=\"no\" style=\"margin-right: 16px;\">" + noButton + "</button>\n          <button ownid-btn=\"yes\">" + yesButton + "</button>\n        </section>\n      </div>\n      " + this.pendingTemplate(pendingTexts);
        var yesBtn = this.ref.querySelector('[ownid-btn="yes"]');
        yesBtn.addEventListener('click', function () { return yesCb(); });
        var noBtn = this.ref.querySelector('[ownid-btn="no"]');
        noBtn.addEventListener('click', function () { return noCb(); });
    };
    Qr.prototype.showPending = function (cancelCb) {
        if (cancelCb === void 0) { cancelCb = function () { }; }
        if (this.spendingShown) {
            return;
        }
        this.spendingShown = true;
        var pendingPane = this.ref.querySelector('[ownid-pending]');
        pendingPane.style.display = 'flex';
        var cancelBtn = pendingPane.querySelector('[ownid-btn="cancel"]');
        cancelBtn.addEventListener('click', function () { return cancelCb(); });
    };
    Qr.prototype.showDone = function () {
        var donePane = this.ref.querySelector('[ownid-done]');
        if (donePane) {
            donePane.style.display = 'flex';
        }
    };
    Qr.prototype.generateQRCode = function (href) {
        var qr = qrcode_generator_1.default(0, 'L');
        qr.addData(href);
        qr.make();
        return qr.createImgTag(3, 7);
    };
    Qr.prototype.addOwnIDStyleTag = function (id) {
        var style = document.createElement('style');
        style.id = id;
        style.innerHTML = "[ownid-btn]{min-width:72px;height:36px;background:#fff;border:1px solid #000;border-radius:20px;color:#000;cursor:pointer;outline:0;transition:background-color .2s ease-out,color .2s ease-out}[ownid-btn]:hover{color:#fff;background:#000}@-webkit-keyframes spin{17%{background:0 0;-webkit-box-shadow:none;box-shadow:none}35%{-webkit-transform:rotate(-135deg);transform:rotate(-135deg);width:5px;height:5px;background:#000;border-radius:1px;-webkit-box-shadow:0 0 2px #000;box-shadow:0 0 2px #000}53%{background:0 0;-webkit-box-shadow:none;box-shadow:none}70%{-webkit-transform:rotate(360deg);transform:rotate(360deg);width:20px;height:20px}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{17%{background:0 0;-webkit-box-shadow:none;box-shadow:none}35%{-webkit-transform:rotate(-135deg);transform:rotate(-135deg);width:5px;height:5px;background:#000;border-radius:1px;-webkit-box-shadow:0 0 2px #000;box-shadow:0 0 2px #000}53%{background:0 0;-webkit-box-shadow:none;box-shadow:none}70%{-webkit-transform:rotate(360deg);transform:rotate(360deg);width:20px;height:20px}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}";
        document.head.appendChild(style);
    };
    Qr.prototype.pendingTemplate = function (_a) {
        var message = _a.message, button = _a.button;
        return "<div ownid-pending style=\"display:none; position: absolute;top: 0;background: rgba(255,255,255,.95);width: 100%;height: 100%;flex-direction: column;justify-content: space-around;align-items: center;\">\n      <div>\n        <div style=\"height:40px;display: flex;justify-content: center;align-items: center;\">\n          <svg style=\"-webkit-animation:spin 1.77s ease infinite;-moz-animation:spin 1.77s ease infinite;animation:spin 1.77s ease infinite;\" xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"#030303\"><path d=\"M4.16 8.322a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776L9.108.368c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776L5.052 7.95a1.25 1.25 0 0 1-.891.371zm7.116-1.286a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776l1.662-1.657c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776l-1.675 1.67a1.24 1.24 0 0 1-.878.358zm-7.154 7.132a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776l4.242-4.23c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776l-4.242 4.23a1.23 1.23 0 0 1-.891.371zm2.9 2.877a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776l1.795-1.8c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776l-1.795 1.8c-.24.252-.56.37-.9.37zm4.708-4.695a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776l4.1-4.096c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776l-4.1 4.096c-.24.252-.56.37-.9.37zM1.25 11.2A1.25 1.25 0 0 0 2.5 9.965a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 1.25 1.246zM9.906 20a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776l5.944-5.925c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776l-5.944 5.926a1.25 1.25 0 0 1-.891.371zm8.844-8.815a1.25 1.25 0 1 0-1.25-1.246 1.25 1.25 0 0 0 1.25 1.246z\"></path></svg>\n        </div>\n        <div style=\"font-weight: bold\">" + message + "</div>\n      </div>\n      <button ownid-btn=\"cancel\">" + button + "</button>\n    </div>";
    };
    return Qr;
}(base_common_component_1.default));
exports.default = Qr;
//# sourceMappingURL=qr.component.js.map