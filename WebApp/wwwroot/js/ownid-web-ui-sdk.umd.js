(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var BaseComponent = /** @class */ (function () {
        function BaseComponent(parentElement) {
            this.elements = [];
            this.parent = parentElement;
        }
        BaseComponent.prototype.addChild = function (child) {
            child.appendToParent(this.parent);
            this.elements.push(child);
        };
        // needs to be placed in utils
        BaseComponent.prototype.isMobile = function () {
            return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|android|silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
                || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[23]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(navigator.userAgent.slice(0, 4));
        };
        return BaseComponent;
    }());

    var BaseCommonComponent = /** @class */ (function () {
        function BaseCommonComponent(options) {
            this.ref = this.render(options);
        }
        BaseCommonComponent.prototype.attachHandler = function (event, handler) {
            this.ref.addEventListener(event, handler);
        };
        BaseCommonComponent.prototype.appendToParent = function (parent) {
            parent.append(this.ref);
        };
        BaseCommonComponent.prototype.destroy = function () {
            this.ref.remove();
        };
        return BaseCommonComponent;
    }());

    var LinkButton = /** @class */ (function (_super) {
        __extends(LinkButton, _super);
        function LinkButton(options) {
            return _super.call(this, options) || this;
        }
        LinkButton.prototype.render = function (options) {
            var anchorElement = document.createElement('a');
            if (options.id) {
                anchorElement.id = options.id;
            }
            anchorElement.href = options.href;
            anchorElement.style.cssText = 'width: 288px; height: 40px; display: flex; align-items: center; ' +
                'justify-content: center; border-radius: 20px; border-style: solid; border-width: 1px' +
                'font-family: SF Pro Text; font-style: normal; font-weight: 500; font-size: 16px; color: #030303;' +
                'text-decoration: none; background-color: #fff; ';
            anchorElement.className = options.className || '';
            anchorElement.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"#030303\">\n        <path d=\"M4.16 8.322a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776L9.108.368c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776L5.052 7.95a1.25 1.25 0 0 1-.891.371zm7.116-1.286a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776l1.662-1.657c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776l-1.675 1.67a1.24 1.24 0 0 1-.878.358zm-7.154 7.132a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776l4.242-4.23c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776l-4.242 4.23a1.23 1.23 0 0 1-.891.371zm2.9 2.877a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776l1.795-1.8c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776l-1.795 1.8c-.24.252-.56.37-.9.37zm4.708-4.695a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776l4.1-4.096c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776l-4.1 4.096c-.24.252-.56.37-.9.37zM1.25 11.2A1.25 1.25 0 0 0 2.5 9.965a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 1.25 1.246zM9.906 20a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776l5.944-5.925c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776l-5.944 5.926a1.25 1.25 0 0 1-.891.371zm8.844-8.815a1.25 1.25 0 1 0-1.25-1.246 1.25 1.25 0 0 0 1.25 1.246z\"/></svg>\n      <span style=\"margin-left: 10px;\">" + options.textContent + "</span>";
            return anchorElement;
        };
        return LinkButton;
    }(BaseCommonComponent));

    // placeholder for real QR
    var Qr = /** @class */ (function (_super) {
        __extends(Qr, _super);
        function Qr(options) {
            return _super.call(this, options) || this;
        }
        Qr.prototype.render = function (options) {
            var button = document.createElement('button');
            if (options.id != null)
                button.id = options.id;
            button.className = options.className || '';
            return button;
        };
        return Qr;
    }(BaseCommonComponent));

    // todo: implement in correct way
    var ConfigurationService = /** @class */ (function () {
        function ConfigurationService() {
        }
        ConfigurationService.webApplicationUrl = 'https://idwallet-mobile-web-wallet.herokuapp.com';
        return ConfigurationService;
    }());

    var RegisterComponent = /** @class */ (function (_super) {
        __extends(RegisterComponent, _super);
        function RegisterComponent(parent) {
            var _this = _super.call(this, parent) || this;
            _this.render();
            return _this;
        }
        RegisterComponent.prototype.render = function () {
            // get application URL
            if (this.isMobile()) {
                var button = new LinkButton({ href: ConfigurationService.webApplicationUrl, className: 'link-button', textContent: 'Register without password' });
                this.addChild(button);
            }
            else
                this.addChild(new Qr({ className: 'qr' }));
        };
        return RegisterComponent;
    }(BaseComponent));

    var LoginComponent = /** @class */ (function (_super) {
        __extends(LoginComponent, _super);
        function LoginComponent(parent) {
            var _this = _super.call(this, parent) || this;
            _this.render();
            return _this;
        }
        LoginComponent.prototype.render = function () {
            // get application URL
            if (this.isMobile()) {
                var button = new LinkButton({ href: ConfigurationService.webApplicationUrl, className: 'link-button', textContent: 'Sign In without password' });
                this.addChild(button);
            }
            else
                this.addChild(new Qr({ className: 'qr' }));
        };
        return LoginComponent;
    }(BaseComponent));

    var OwnIDUiSdk = /** @class */ (function () {
        function OwnIDUiSdk() {
        }
        OwnIDUiSdk.prototype.addRegisterWidget = function (parent) {
            return new RegisterComponent(parent);
        };
        OwnIDUiSdk.prototype.addLoginWidget = function (parent) {
            return new LoginComponent(parent);
        };
        return OwnIDUiSdk;
    }());

    window.ownid = window.ownid || new OwnIDUiSdk();

})));
//# sourceMappingURL=ownid-web-ui-sdk.umd.js.map
