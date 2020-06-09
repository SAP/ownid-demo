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

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var BaseComponent = /** @class */ (function () {
        function BaseComponent(config) {
            this.elements = [];
            this.context = null;
            this.nonce = null;
            this.parent = config.element;
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
            anchorElement.href = options.href;
            anchorElement.setAttribute('target', '_blank');
            anchorElement.style.cssText = "width: 288px; height: 40px;\n      display: flex; align-items: center; justify-content: center; border-radius: 20px;\n      font-family: SF Pro Text, sans-serif; font-style: normal; font-weight: 500; font-size: 14px; color: #030303;\n      text-decoration: none; background-color: #fff;";
            anchorElement.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"#030303\"><path d=\"M4.16 8.322a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776L9.108.368c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776L5.052 7.95a1.25 1.25 0 0 1-.891.371zm7.116-1.286a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776l1.662-1.657c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776l-1.675 1.67a1.24 1.24 0 0 1-.878.358zm-7.154 7.132a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776l4.242-4.23c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776l-4.242 4.23a1.23 1.23 0 0 1-.891.371zm2.9 2.877a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776l1.795-1.8c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776l-1.795 1.8c-.24.252-.56.37-.9.37zm4.708-4.695a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776l4.1-4.096c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776l-4.1 4.096c-.24.252-.56.37-.9.37zM1.25 11.2A1.25 1.25 0 0 0 2.5 9.965a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 1.25 1.246zM9.906 20a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776l5.944-5.925c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776l-5.944 5.926a1.25 1.25 0 0 1-.891.371zm8.844-8.815a1.25 1.25 0 1 0-1.25-1.246 1.25 1.25 0 0 0 1.25 1.246z\"/></svg><span style=\"margin-left: 10px;\">" + options.title + "</span>";
            return anchorElement;
        };
        return LinkButton;
    }(BaseCommonComponent));

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var qrcode_1 = createCommonjsModule(function (module, exports) {
    //---------------------------------------------------------------------
    //
    // QR Code Generator for JavaScript
    //
    // Copyright (c) 2009 Kazuhiko Arase
    //
    // URL: http://www.d-project.com/
    //
    // Licensed under the MIT license:
    //  http://www.opensource.org/licenses/mit-license.php
    //
    // The word 'QR Code' is registered trademark of
    // DENSO WAVE INCORPORATED
    //  http://www.denso-wave.com/qrcode/faqpatent-e.html
    //
    //---------------------------------------------------------------------

    var qrcode = function() {

      //---------------------------------------------------------------------
      // qrcode
      //---------------------------------------------------------------------

      /**
       * qrcode
       * @param typeNumber 1 to 40
       * @param errorCorrectionLevel 'L','M','Q','H'
       */
      var qrcode = function(typeNumber, errorCorrectionLevel) {

        var PAD0 = 0xEC;
        var PAD1 = 0x11;

        var _typeNumber = typeNumber;
        var _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];
        var _modules = null;
        var _moduleCount = 0;
        var _dataCache = null;
        var _dataList = [];

        var _this = {};

        var makeImpl = function(test, maskPattern) {

          _moduleCount = _typeNumber * 4 + 17;
          _modules = function(moduleCount) {
            var modules = new Array(moduleCount);
            for (var row = 0; row < moduleCount; row += 1) {
              modules[row] = new Array(moduleCount);
              for (var col = 0; col < moduleCount; col += 1) {
                modules[row][col] = null;
              }
            }
            return modules;
          }(_moduleCount);

          setupPositionProbePattern(0, 0);
          setupPositionProbePattern(_moduleCount - 7, 0);
          setupPositionProbePattern(0, _moduleCount - 7);
          setupPositionAdjustPattern();
          setupTimingPattern();
          setupTypeInfo(test, maskPattern);

          if (_typeNumber >= 7) {
            setupTypeNumber(test);
          }

          if (_dataCache == null) {
            _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList);
          }

          mapData(_dataCache, maskPattern);
        };

        var setupPositionProbePattern = function(row, col) {

          for (var r = -1; r <= 7; r += 1) {

            if (row + r <= -1 || _moduleCount <= row + r) continue;

            for (var c = -1; c <= 7; c += 1) {

              if (col + c <= -1 || _moduleCount <= col + c) continue;

              if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )
                  || (0 <= c && c <= 6 && (r == 0 || r == 6) )
                  || (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
                _modules[row + r][col + c] = true;
              } else {
                _modules[row + r][col + c] = false;
              }
            }
          }
        };

        var getBestMaskPattern = function() {

          var minLostPoint = 0;
          var pattern = 0;

          for (var i = 0; i < 8; i += 1) {

            makeImpl(true, i);

            var lostPoint = QRUtil.getLostPoint(_this);

            if (i == 0 || minLostPoint > lostPoint) {
              minLostPoint = lostPoint;
              pattern = i;
            }
          }

          return pattern;
        };

        var setupTimingPattern = function() {

          for (var r = 8; r < _moduleCount - 8; r += 1) {
            if (_modules[r][6] != null) {
              continue;
            }
            _modules[r][6] = (r % 2 == 0);
          }

          for (var c = 8; c < _moduleCount - 8; c += 1) {
            if (_modules[6][c] != null) {
              continue;
            }
            _modules[6][c] = (c % 2 == 0);
          }
        };

        var setupPositionAdjustPattern = function() {

          var pos = QRUtil.getPatternPosition(_typeNumber);

          for (var i = 0; i < pos.length; i += 1) {

            for (var j = 0; j < pos.length; j += 1) {

              var row = pos[i];
              var col = pos[j];

              if (_modules[row][col] != null) {
                continue;
              }

              for (var r = -2; r <= 2; r += 1) {

                for (var c = -2; c <= 2; c += 1) {

                  if (r == -2 || r == 2 || c == -2 || c == 2
                      || (r == 0 && c == 0) ) {
                    _modules[row + r][col + c] = true;
                  } else {
                    _modules[row + r][col + c] = false;
                  }
                }
              }
            }
          }
        };

        var setupTypeNumber = function(test) {

          var bits = QRUtil.getBCHTypeNumber(_typeNumber);

          for (var i = 0; i < 18; i += 1) {
            var mod = (!test && ( (bits >> i) & 1) == 1);
            _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
          }

          for (var i = 0; i < 18; i += 1) {
            var mod = (!test && ( (bits >> i) & 1) == 1);
            _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
          }
        };

        var setupTypeInfo = function(test, maskPattern) {

          var data = (_errorCorrectionLevel << 3) | maskPattern;
          var bits = QRUtil.getBCHTypeInfo(data);

          // vertical
          for (var i = 0; i < 15; i += 1) {

            var mod = (!test && ( (bits >> i) & 1) == 1);

            if (i < 6) {
              _modules[i][8] = mod;
            } else if (i < 8) {
              _modules[i + 1][8] = mod;
            } else {
              _modules[_moduleCount - 15 + i][8] = mod;
            }
          }

          // horizontal
          for (var i = 0; i < 15; i += 1) {

            var mod = (!test && ( (bits >> i) & 1) == 1);

            if (i < 8) {
              _modules[8][_moduleCount - i - 1] = mod;
            } else if (i < 9) {
              _modules[8][15 - i - 1 + 1] = mod;
            } else {
              _modules[8][15 - i - 1] = mod;
            }
          }

          // fixed module
          _modules[_moduleCount - 8][8] = (!test);
        };

        var mapData = function(data, maskPattern) {

          var inc = -1;
          var row = _moduleCount - 1;
          var bitIndex = 7;
          var byteIndex = 0;
          var maskFunc = QRUtil.getMaskFunction(maskPattern);

          for (var col = _moduleCount - 1; col > 0; col -= 2) {

            if (col == 6) col -= 1;

            while (true) {

              for (var c = 0; c < 2; c += 1) {

                if (_modules[row][col - c] == null) {

                  var dark = false;

                  if (byteIndex < data.length) {
                    dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);
                  }

                  var mask = maskFunc(row, col - c);

                  if (mask) {
                    dark = !dark;
                  }

                  _modules[row][col - c] = dark;
                  bitIndex -= 1;

                  if (bitIndex == -1) {
                    byteIndex += 1;
                    bitIndex = 7;
                  }
                }
              }

              row += inc;

              if (row < 0 || _moduleCount <= row) {
                row -= inc;
                inc = -inc;
                break;
              }
            }
          }
        };

        var createBytes = function(buffer, rsBlocks) {

          var offset = 0;

          var maxDcCount = 0;
          var maxEcCount = 0;

          var dcdata = new Array(rsBlocks.length);
          var ecdata = new Array(rsBlocks.length);

          for (var r = 0; r < rsBlocks.length; r += 1) {

            var dcCount = rsBlocks[r].dataCount;
            var ecCount = rsBlocks[r].totalCount - dcCount;

            maxDcCount = Math.max(maxDcCount, dcCount);
            maxEcCount = Math.max(maxEcCount, ecCount);

            dcdata[r] = new Array(dcCount);

            for (var i = 0; i < dcdata[r].length; i += 1) {
              dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset];
            }
            offset += dcCount;

            var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
            var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);

            var modPoly = rawPoly.mod(rsPoly);
            ecdata[r] = new Array(rsPoly.getLength() - 1);
            for (var i = 0; i < ecdata[r].length; i += 1) {
              var modIndex = i + modPoly.getLength() - ecdata[r].length;
              ecdata[r][i] = (modIndex >= 0)? modPoly.getAt(modIndex) : 0;
            }
          }

          var totalCodeCount = 0;
          for (var i = 0; i < rsBlocks.length; i += 1) {
            totalCodeCount += rsBlocks[i].totalCount;
          }

          var data = new Array(totalCodeCount);
          var index = 0;

          for (var i = 0; i < maxDcCount; i += 1) {
            for (var r = 0; r < rsBlocks.length; r += 1) {
              if (i < dcdata[r].length) {
                data[index] = dcdata[r][i];
                index += 1;
              }
            }
          }

          for (var i = 0; i < maxEcCount; i += 1) {
            for (var r = 0; r < rsBlocks.length; r += 1) {
              if (i < ecdata[r].length) {
                data[index] = ecdata[r][i];
                index += 1;
              }
            }
          }

          return data;
        };

        var createData = function(typeNumber, errorCorrectionLevel, dataList) {

          var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectionLevel);

          var buffer = qrBitBuffer();

          for (var i = 0; i < dataList.length; i += 1) {
            var data = dataList[i];
            buffer.put(data.getMode(), 4);
            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );
            data.write(buffer);
          }

          // calc num max data.
          var totalDataCount = 0;
          for (var i = 0; i < rsBlocks.length; i += 1) {
            totalDataCount += rsBlocks[i].dataCount;
          }

          if (buffer.getLengthInBits() > totalDataCount * 8) {
            throw 'code length overflow. ('
              + buffer.getLengthInBits()
              + '>'
              + totalDataCount * 8
              + ')';
          }

          // end code
          if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
            buffer.put(0, 4);
          }

          // padding
          while (buffer.getLengthInBits() % 8 != 0) {
            buffer.putBit(false);
          }

          // padding
          while (true) {

            if (buffer.getLengthInBits() >= totalDataCount * 8) {
              break;
            }
            buffer.put(PAD0, 8);

            if (buffer.getLengthInBits() >= totalDataCount * 8) {
              break;
            }
            buffer.put(PAD1, 8);
          }

          return createBytes(buffer, rsBlocks);
        };

        _this.addData = function(data, mode) {

          mode = mode || 'Byte';

          var newData = null;

          switch(mode) {
          case 'Numeric' :
            newData = qrNumber(data);
            break;
          case 'Alphanumeric' :
            newData = qrAlphaNum(data);
            break;
          case 'Byte' :
            newData = qr8BitByte(data);
            break;
          case 'Kanji' :
            newData = qrKanji(data);
            break;
          default :
            throw 'mode:' + mode;
          }

          _dataList.push(newData);
          _dataCache = null;
        };

        _this.isDark = function(row, col) {
          if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
            throw row + ',' + col;
          }
          return _modules[row][col];
        };

        _this.getModuleCount = function() {
          return _moduleCount;
        };

        _this.make = function() {
          if (_typeNumber < 1) {
            var typeNumber = 1;

            for (; typeNumber < 40; typeNumber++) {
              var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, _errorCorrectionLevel);
              var buffer = qrBitBuffer();

              for (var i = 0; i < _dataList.length; i++) {
                var data = _dataList[i];
                buffer.put(data.getMode(), 4);
                buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );
                data.write(buffer);
              }

              var totalDataCount = 0;
              for (var i = 0; i < rsBlocks.length; i++) {
                totalDataCount += rsBlocks[i].dataCount;
              }

              if (buffer.getLengthInBits() <= totalDataCount * 8) {
                break;
              }
            }

            _typeNumber = typeNumber;
          }

          makeImpl(false, getBestMaskPattern() );
        };

        _this.createTableTag = function(cellSize, margin) {

          cellSize = cellSize || 2;
          margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

          var qrHtml = '';

          qrHtml += '<table style="';
          qrHtml += ' border-width: 0px; border-style: none;';
          qrHtml += ' border-collapse: collapse;';
          qrHtml += ' padding: 0px; margin: ' + margin + 'px;';
          qrHtml += '">';
          qrHtml += '<tbody>';

          for (var r = 0; r < _this.getModuleCount(); r += 1) {

            qrHtml += '<tr>';

            for (var c = 0; c < _this.getModuleCount(); c += 1) {
              qrHtml += '<td style="';
              qrHtml += ' border-width: 0px; border-style: none;';
              qrHtml += ' border-collapse: collapse;';
              qrHtml += ' padding: 0px; margin: 0px;';
              qrHtml += ' width: ' + cellSize + 'px;';
              qrHtml += ' height: ' + cellSize + 'px;';
              qrHtml += ' background-color: ';
              qrHtml += _this.isDark(r, c)? '#000000' : '#ffffff';
              qrHtml += ';';
              qrHtml += '"/>';
            }

            qrHtml += '</tr>';
          }

          qrHtml += '</tbody>';
          qrHtml += '</table>';

          return qrHtml;
        };

        _this.createSvgTag = function(cellSize, margin, alt, title) {

          var opts = {};
          if (typeof arguments[0] == 'object') {
            // Called by options.
            opts = arguments[0];
            // overwrite cellSize and margin.
            cellSize = opts.cellSize;
            margin = opts.margin;
            alt = opts.alt;
            title = opts.title;
          }

          cellSize = cellSize || 2;
          margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

          // Compose alt property surrogate
          alt = (typeof alt === 'string') ? {text: alt} : alt || {};
          alt.text = alt.text || null;
          alt.id = (alt.text) ? alt.id || 'qrcode-description' : null;

          // Compose title property surrogate
          title = (typeof title === 'string') ? {text: title} : title || {};
          title.text = title.text || null;
          title.id = (title.text) ? title.id || 'qrcode-title' : null;

          var size = _this.getModuleCount() * cellSize + margin * 2;
          var c, mc, r, mr, qrSvg='', rect;

          rect = 'l' + cellSize + ',0 0,' + cellSize +
            ' -' + cellSize + ',0 0,-' + cellSize + 'z ';

          qrSvg += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"';
          qrSvg += !opts.scalable ? ' width="' + size + 'px" height="' + size + 'px"' : '';
          qrSvg += ' viewBox="0 0 ' + size + ' ' + size + '" ';
          qrSvg += ' preserveAspectRatio="xMinYMin meet"';
          qrSvg += (title.text || alt.text) ? ' role="img" aria-labelledby="' +
              escapeXml([title.id, alt.id].join(' ').trim() ) + '"' : '';
          qrSvg += '>';
          qrSvg += (title.text) ? '<title id="' + escapeXml(title.id) + '">' +
              escapeXml(title.text) + '</title>' : '';
          qrSvg += (alt.text) ? '<description id="' + escapeXml(alt.id) + '">' +
              escapeXml(alt.text) + '</description>' : '';
          qrSvg += '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>';
          qrSvg += '<path d="';

          for (r = 0; r < _this.getModuleCount(); r += 1) {
            mr = r * cellSize + margin;
            for (c = 0; c < _this.getModuleCount(); c += 1) {
              if (_this.isDark(r, c) ) {
                mc = c*cellSize+margin;
                qrSvg += 'M' + mc + ',' + mr + rect;
              }
            }
          }

          qrSvg += '" stroke="transparent" fill="black"/>';
          qrSvg += '</svg>';

          return qrSvg;
        };

        _this.createDataURL = function(cellSize, margin) {

          cellSize = cellSize || 2;
          margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

          var size = _this.getModuleCount() * cellSize + margin * 2;
          var min = margin;
          var max = size - margin;

          return createDataURL(size, size, function(x, y) {
            if (min <= x && x < max && min <= y && y < max) {
              var c = Math.floor( (x - min) / cellSize);
              var r = Math.floor( (y - min) / cellSize);
              return _this.isDark(r, c)? 0 : 1;
            } else {
              return 1;
            }
          } );
        };

        _this.createImgTag = function(cellSize, margin, alt) {

          cellSize = cellSize || 2;
          margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

          var size = _this.getModuleCount() * cellSize + margin * 2;

          var img = '';
          img += '<img';
          img += '\u0020src="';
          img += _this.createDataURL(cellSize, margin);
          img += '"';
          img += '\u0020width="';
          img += size;
          img += '"';
          img += '\u0020height="';
          img += size;
          img += '"';
          if (alt) {
            img += '\u0020alt="';
            img += escapeXml(alt);
            img += '"';
          }
          img += '/>';

          return img;
        };

        var escapeXml = function(s) {
          var escaped = '';
          for (var i = 0; i < s.length; i += 1) {
            var c = s.charAt(i);
            switch(c) {
            case '<': escaped += '&lt;'; break;
            case '>': escaped += '&gt;'; break;
            case '&': escaped += '&amp;'; break;
            case '"': escaped += '&quot;'; break;
            default : escaped += c; break;
            }
          }
          return escaped;
        };

        var _createHalfASCII = function(margin) {
          var cellSize = 1;
          margin = (typeof margin == 'undefined')? cellSize * 2 : margin;

          var size = _this.getModuleCount() * cellSize + margin * 2;
          var min = margin;
          var max = size - margin;

          var y, x, r1, r2, p;

          var blocks = {
            '██': '█',
            '█ ': '▀',
            ' █': '▄',
            '  ': ' '
          };

          var blocksLastLineNoMargin = {
            '██': '▀',
            '█ ': '▀',
            ' █': ' ',
            '  ': ' '
          };

          var ascii = '';
          for (y = 0; y < size; y += 2) {
            r1 = Math.floor((y - min) / cellSize);
            r2 = Math.floor((y + 1 - min) / cellSize);
            for (x = 0; x < size; x += 1) {
              p = '█';

              if (min <= x && x < max && min <= y && y < max && _this.isDark(r1, Math.floor((x - min) / cellSize))) {
                p = ' ';
              }

              if (min <= x && x < max && min <= y+1 && y+1 < max && _this.isDark(r2, Math.floor((x - min) / cellSize))) {
                p += ' ';
              }
              else {
                p += '█';
              }

              // Output 2 characters per pixel, to create full square. 1 character per pixels gives only half width of square.
              ascii += (margin < 1 && y+1 >= max) ? blocksLastLineNoMargin[p] : blocks[p];
            }

            ascii += '\n';
          }

          if (size % 2 && margin > 0) {
            return ascii.substring(0, ascii.length - size - 1) + Array(size+1).join('▀');
          }

          return ascii.substring(0, ascii.length-1);
        };

        _this.createASCII = function(cellSize, margin) {
          cellSize = cellSize || 1;

          if (cellSize < 2) {
            return _createHalfASCII(margin);
          }

          cellSize -= 1;
          margin = (typeof margin == 'undefined')? cellSize * 2 : margin;

          var size = _this.getModuleCount() * cellSize + margin * 2;
          var min = margin;
          var max = size - margin;

          var y, x, r, p;

          var white = Array(cellSize+1).join('██');
          var black = Array(cellSize+1).join('  ');

          var ascii = '';
          var line = '';
          for (y = 0; y < size; y += 1) {
            r = Math.floor( (y - min) / cellSize);
            line = '';
            for (x = 0; x < size; x += 1) {
              p = 1;

              if (min <= x && x < max && min <= y && y < max && _this.isDark(r, Math.floor((x - min) / cellSize))) {
                p = 0;
              }

              // Output 2 characters per pixel, to create full square. 1 character per pixels gives only half width of square.
              line += p ? white : black;
            }

            for (r = 0; r < cellSize; r += 1) {
              ascii += line + '\n';
            }
          }

          return ascii.substring(0, ascii.length-1);
        };

        _this.renderTo2dContext = function(context, cellSize) {
          cellSize = cellSize || 2;
          var length = _this.getModuleCount();
          for (var row = 0; row < length; row++) {
            for (var col = 0; col < length; col++) {
              context.fillStyle = _this.isDark(row, col) ? 'black' : 'white';
              context.fillRect(row * cellSize, col * cellSize, cellSize, cellSize);
            }
          }
        };

        return _this;
      };

      //---------------------------------------------------------------------
      // qrcode.stringToBytes
      //---------------------------------------------------------------------

      qrcode.stringToBytesFuncs = {
        'default' : function(s) {
          var bytes = [];
          for (var i = 0; i < s.length; i += 1) {
            var c = s.charCodeAt(i);
            bytes.push(c & 0xff);
          }
          return bytes;
        }
      };

      qrcode.stringToBytes = qrcode.stringToBytesFuncs['default'];

      //---------------------------------------------------------------------
      // qrcode.createStringToBytes
      //---------------------------------------------------------------------

      /**
       * @param unicodeData base64 string of byte array.
       * [16bit Unicode],[16bit Bytes], ...
       * @param numChars
       */
      qrcode.createStringToBytes = function(unicodeData, numChars) {

        // create conversion map.

        var unicodeMap = function() {

          var bin = base64DecodeInputStream(unicodeData);
          var read = function() {
            var b = bin.read();
            if (b == -1) throw 'eof';
            return b;
          };

          var count = 0;
          var unicodeMap = {};
          while (true) {
            var b0 = bin.read();
            if (b0 == -1) break;
            var b1 = read();
            var b2 = read();
            var b3 = read();
            var k = String.fromCharCode( (b0 << 8) | b1);
            var v = (b2 << 8) | b3;
            unicodeMap[k] = v;
            count += 1;
          }
          if (count != numChars) {
            throw count + ' != ' + numChars;
          }

          return unicodeMap;
        }();

        var unknownChar = '?'.charCodeAt(0);

        return function(s) {
          var bytes = [];
          for (var i = 0; i < s.length; i += 1) {
            var c = s.charCodeAt(i);
            if (c < 128) {
              bytes.push(c);
            } else {
              var b = unicodeMap[s.charAt(i)];
              if (typeof b == 'number') {
                if ( (b & 0xff) == b) {
                  // 1byte
                  bytes.push(b);
                } else {
                  // 2bytes
                  bytes.push(b >>> 8);
                  bytes.push(b & 0xff);
                }
              } else {
                bytes.push(unknownChar);
              }
            }
          }
          return bytes;
        };
      };

      //---------------------------------------------------------------------
      // QRMode
      //---------------------------------------------------------------------

      var QRMode = {
        MODE_NUMBER :    1 << 0,
        MODE_ALPHA_NUM : 1 << 1,
        MODE_8BIT_BYTE : 1 << 2,
        MODE_KANJI :     1 << 3
      };

      //---------------------------------------------------------------------
      // QRErrorCorrectionLevel
      //---------------------------------------------------------------------

      var QRErrorCorrectionLevel = {
        L : 1,
        M : 0,
        Q : 3,
        H : 2
      };

      //---------------------------------------------------------------------
      // QRMaskPattern
      //---------------------------------------------------------------------

      var QRMaskPattern = {
        PATTERN000 : 0,
        PATTERN001 : 1,
        PATTERN010 : 2,
        PATTERN011 : 3,
        PATTERN100 : 4,
        PATTERN101 : 5,
        PATTERN110 : 6,
        PATTERN111 : 7
      };

      //---------------------------------------------------------------------
      // QRUtil
      //---------------------------------------------------------------------

      var QRUtil = function() {

        var PATTERN_POSITION_TABLE = [
          [],
          [6, 18],
          [6, 22],
          [6, 26],
          [6, 30],
          [6, 34],
          [6, 22, 38],
          [6, 24, 42],
          [6, 26, 46],
          [6, 28, 50],
          [6, 30, 54],
          [6, 32, 58],
          [6, 34, 62],
          [6, 26, 46, 66],
          [6, 26, 48, 70],
          [6, 26, 50, 74],
          [6, 30, 54, 78],
          [6, 30, 56, 82],
          [6, 30, 58, 86],
          [6, 34, 62, 90],
          [6, 28, 50, 72, 94],
          [6, 26, 50, 74, 98],
          [6, 30, 54, 78, 102],
          [6, 28, 54, 80, 106],
          [6, 32, 58, 84, 110],
          [6, 30, 58, 86, 114],
          [6, 34, 62, 90, 118],
          [6, 26, 50, 74, 98, 122],
          [6, 30, 54, 78, 102, 126],
          [6, 26, 52, 78, 104, 130],
          [6, 30, 56, 82, 108, 134],
          [6, 34, 60, 86, 112, 138],
          [6, 30, 58, 86, 114, 142],
          [6, 34, 62, 90, 118, 146],
          [6, 30, 54, 78, 102, 126, 150],
          [6, 24, 50, 76, 102, 128, 154],
          [6, 28, 54, 80, 106, 132, 158],
          [6, 32, 58, 84, 110, 136, 162],
          [6, 26, 54, 82, 110, 138, 166],
          [6, 30, 58, 86, 114, 142, 170]
        ];
        var G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
        var G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);
        var G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);

        var _this = {};

        var getBCHDigit = function(data) {
          var digit = 0;
          while (data != 0) {
            digit += 1;
            data >>>= 1;
          }
          return digit;
        };

        _this.getBCHTypeInfo = function(data) {
          var d = data << 10;
          while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
            d ^= (G15 << (getBCHDigit(d) - getBCHDigit(G15) ) );
          }
          return ( (data << 10) | d) ^ G15_MASK;
        };

        _this.getBCHTypeNumber = function(data) {
          var d = data << 12;
          while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
            d ^= (G18 << (getBCHDigit(d) - getBCHDigit(G18) ) );
          }
          return (data << 12) | d;
        };

        _this.getPatternPosition = function(typeNumber) {
          return PATTERN_POSITION_TABLE[typeNumber - 1];
        };

        _this.getMaskFunction = function(maskPattern) {

          switch (maskPattern) {

          case QRMaskPattern.PATTERN000 :
            return function(i, j) { return (i + j) % 2 == 0; };
          case QRMaskPattern.PATTERN001 :
            return function(i, j) { return i % 2 == 0; };
          case QRMaskPattern.PATTERN010 :
            return function(i, j) { return j % 3 == 0; };
          case QRMaskPattern.PATTERN011 :
            return function(i, j) { return (i + j) % 3 == 0; };
          case QRMaskPattern.PATTERN100 :
            return function(i, j) { return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0; };
          case QRMaskPattern.PATTERN101 :
            return function(i, j) { return (i * j) % 2 + (i * j) % 3 == 0; };
          case QRMaskPattern.PATTERN110 :
            return function(i, j) { return ( (i * j) % 2 + (i * j) % 3) % 2 == 0; };
          case QRMaskPattern.PATTERN111 :
            return function(i, j) { return ( (i * j) % 3 + (i + j) % 2) % 2 == 0; };

          default :
            throw 'bad maskPattern:' + maskPattern;
          }
        };

        _this.getErrorCorrectPolynomial = function(errorCorrectLength) {
          var a = qrPolynomial([1], 0);
          for (var i = 0; i < errorCorrectLength; i += 1) {
            a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0) );
          }
          return a;
        };

        _this.getLengthInBits = function(mode, type) {

          if (1 <= type && type < 10) {

            // 1 - 9

            switch(mode) {
            case QRMode.MODE_NUMBER    : return 10;
            case QRMode.MODE_ALPHA_NUM : return 9;
            case QRMode.MODE_8BIT_BYTE : return 8;
            case QRMode.MODE_KANJI     : return 8;
            default :
              throw 'mode:' + mode;
            }

          } else if (type < 27) {

            // 10 - 26

            switch(mode) {
            case QRMode.MODE_NUMBER    : return 12;
            case QRMode.MODE_ALPHA_NUM : return 11;
            case QRMode.MODE_8BIT_BYTE : return 16;
            case QRMode.MODE_KANJI     : return 10;
            default :
              throw 'mode:' + mode;
            }

          } else if (type < 41) {

            // 27 - 40

            switch(mode) {
            case QRMode.MODE_NUMBER    : return 14;
            case QRMode.MODE_ALPHA_NUM : return 13;
            case QRMode.MODE_8BIT_BYTE : return 16;
            case QRMode.MODE_KANJI     : return 12;
            default :
              throw 'mode:' + mode;
            }

          } else {
            throw 'type:' + type;
          }
        };

        _this.getLostPoint = function(qrcode) {

          var moduleCount = qrcode.getModuleCount();

          var lostPoint = 0;

          // LEVEL1

          for (var row = 0; row < moduleCount; row += 1) {
            for (var col = 0; col < moduleCount; col += 1) {

              var sameCount = 0;
              var dark = qrcode.isDark(row, col);

              for (var r = -1; r <= 1; r += 1) {

                if (row + r < 0 || moduleCount <= row + r) {
                  continue;
                }

                for (var c = -1; c <= 1; c += 1) {

                  if (col + c < 0 || moduleCount <= col + c) {
                    continue;
                  }

                  if (r == 0 && c == 0) {
                    continue;
                  }

                  if (dark == qrcode.isDark(row + r, col + c) ) {
                    sameCount += 1;
                  }
                }
              }

              if (sameCount > 5) {
                lostPoint += (3 + sameCount - 5);
              }
            }
          }
          // LEVEL2

          for (var row = 0; row < moduleCount - 1; row += 1) {
            for (var col = 0; col < moduleCount - 1; col += 1) {
              var count = 0;
              if (qrcode.isDark(row, col) ) count += 1;
              if (qrcode.isDark(row + 1, col) ) count += 1;
              if (qrcode.isDark(row, col + 1) ) count += 1;
              if (qrcode.isDark(row + 1, col + 1) ) count += 1;
              if (count == 0 || count == 4) {
                lostPoint += 3;
              }
            }
          }

          // LEVEL3

          for (var row = 0; row < moduleCount; row += 1) {
            for (var col = 0; col < moduleCount - 6; col += 1) {
              if (qrcode.isDark(row, col)
                  && !qrcode.isDark(row, col + 1)
                  &&  qrcode.isDark(row, col + 2)
                  &&  qrcode.isDark(row, col + 3)
                  &&  qrcode.isDark(row, col + 4)
                  && !qrcode.isDark(row, col + 5)
                  &&  qrcode.isDark(row, col + 6) ) {
                lostPoint += 40;
              }
            }
          }

          for (var col = 0; col < moduleCount; col += 1) {
            for (var row = 0; row < moduleCount - 6; row += 1) {
              if (qrcode.isDark(row, col)
                  && !qrcode.isDark(row + 1, col)
                  &&  qrcode.isDark(row + 2, col)
                  &&  qrcode.isDark(row + 3, col)
                  &&  qrcode.isDark(row + 4, col)
                  && !qrcode.isDark(row + 5, col)
                  &&  qrcode.isDark(row + 6, col) ) {
                lostPoint += 40;
              }
            }
          }

          // LEVEL4

          var darkCount = 0;

          for (var col = 0; col < moduleCount; col += 1) {
            for (var row = 0; row < moduleCount; row += 1) {
              if (qrcode.isDark(row, col) ) {
                darkCount += 1;
              }
            }
          }

          var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
          lostPoint += ratio * 10;

          return lostPoint;
        };

        return _this;
      }();

      //---------------------------------------------------------------------
      // QRMath
      //---------------------------------------------------------------------

      var QRMath = function() {

        var EXP_TABLE = new Array(256);
        var LOG_TABLE = new Array(256);

        // initialize tables
        for (var i = 0; i < 8; i += 1) {
          EXP_TABLE[i] = 1 << i;
        }
        for (var i = 8; i < 256; i += 1) {
          EXP_TABLE[i] = EXP_TABLE[i - 4]
            ^ EXP_TABLE[i - 5]
            ^ EXP_TABLE[i - 6]
            ^ EXP_TABLE[i - 8];
        }
        for (var i = 0; i < 255; i += 1) {
          LOG_TABLE[EXP_TABLE[i] ] = i;
        }

        var _this = {};

        _this.glog = function(n) {

          if (n < 1) {
            throw 'glog(' + n + ')';
          }

          return LOG_TABLE[n];
        };

        _this.gexp = function(n) {

          while (n < 0) {
            n += 255;
          }

          while (n >= 256) {
            n -= 255;
          }

          return EXP_TABLE[n];
        };

        return _this;
      }();

      //---------------------------------------------------------------------
      // qrPolynomial
      //---------------------------------------------------------------------

      function qrPolynomial(num, shift) {

        if (typeof num.length == 'undefined') {
          throw num.length + '/' + shift;
        }

        var _num = function() {
          var offset = 0;
          while (offset < num.length && num[offset] == 0) {
            offset += 1;
          }
          var _num = new Array(num.length - offset + shift);
          for (var i = 0; i < num.length - offset; i += 1) {
            _num[i] = num[i + offset];
          }
          return _num;
        }();

        var _this = {};

        _this.getAt = function(index) {
          return _num[index];
        };

        _this.getLength = function() {
          return _num.length;
        };

        _this.multiply = function(e) {

          var num = new Array(_this.getLength() + e.getLength() - 1);

          for (var i = 0; i < _this.getLength(); i += 1) {
            for (var j = 0; j < e.getLength(); j += 1) {
              num[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i) ) + QRMath.glog(e.getAt(j) ) );
            }
          }

          return qrPolynomial(num, 0);
        };

        _this.mod = function(e) {

          if (_this.getLength() - e.getLength() < 0) {
            return _this;
          }

          var ratio = QRMath.glog(_this.getAt(0) ) - QRMath.glog(e.getAt(0) );

          var num = new Array(_this.getLength() );
          for (var i = 0; i < _this.getLength(); i += 1) {
            num[i] = _this.getAt(i);
          }

          for (var i = 0; i < e.getLength(); i += 1) {
            num[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i) ) + ratio);
          }

          // recursive call
          return qrPolynomial(num, 0).mod(e);
        };

        return _this;
      }
      //---------------------------------------------------------------------
      // QRRSBlock
      //---------------------------------------------------------------------

      var QRRSBlock = function() {

        var RS_BLOCK_TABLE = [

          // L
          // M
          // Q
          // H

          // 1
          [1, 26, 19],
          [1, 26, 16],
          [1, 26, 13],
          [1, 26, 9],

          // 2
          [1, 44, 34],
          [1, 44, 28],
          [1, 44, 22],
          [1, 44, 16],

          // 3
          [1, 70, 55],
          [1, 70, 44],
          [2, 35, 17],
          [2, 35, 13],

          // 4
          [1, 100, 80],
          [2, 50, 32],
          [2, 50, 24],
          [4, 25, 9],

          // 5
          [1, 134, 108],
          [2, 67, 43],
          [2, 33, 15, 2, 34, 16],
          [2, 33, 11, 2, 34, 12],

          // 6
          [2, 86, 68],
          [4, 43, 27],
          [4, 43, 19],
          [4, 43, 15],

          // 7
          [2, 98, 78],
          [4, 49, 31],
          [2, 32, 14, 4, 33, 15],
          [4, 39, 13, 1, 40, 14],

          // 8
          [2, 121, 97],
          [2, 60, 38, 2, 61, 39],
          [4, 40, 18, 2, 41, 19],
          [4, 40, 14, 2, 41, 15],

          // 9
          [2, 146, 116],
          [3, 58, 36, 2, 59, 37],
          [4, 36, 16, 4, 37, 17],
          [4, 36, 12, 4, 37, 13],

          // 10
          [2, 86, 68, 2, 87, 69],
          [4, 69, 43, 1, 70, 44],
          [6, 43, 19, 2, 44, 20],
          [6, 43, 15, 2, 44, 16],

          // 11
          [4, 101, 81],
          [1, 80, 50, 4, 81, 51],
          [4, 50, 22, 4, 51, 23],
          [3, 36, 12, 8, 37, 13],

          // 12
          [2, 116, 92, 2, 117, 93],
          [6, 58, 36, 2, 59, 37],
          [4, 46, 20, 6, 47, 21],
          [7, 42, 14, 4, 43, 15],

          // 13
          [4, 133, 107],
          [8, 59, 37, 1, 60, 38],
          [8, 44, 20, 4, 45, 21],
          [12, 33, 11, 4, 34, 12],

          // 14
          [3, 145, 115, 1, 146, 116],
          [4, 64, 40, 5, 65, 41],
          [11, 36, 16, 5, 37, 17],
          [11, 36, 12, 5, 37, 13],

          // 15
          [5, 109, 87, 1, 110, 88],
          [5, 65, 41, 5, 66, 42],
          [5, 54, 24, 7, 55, 25],
          [11, 36, 12, 7, 37, 13],

          // 16
          [5, 122, 98, 1, 123, 99],
          [7, 73, 45, 3, 74, 46],
          [15, 43, 19, 2, 44, 20],
          [3, 45, 15, 13, 46, 16],

          // 17
          [1, 135, 107, 5, 136, 108],
          [10, 74, 46, 1, 75, 47],
          [1, 50, 22, 15, 51, 23],
          [2, 42, 14, 17, 43, 15],

          // 18
          [5, 150, 120, 1, 151, 121],
          [9, 69, 43, 4, 70, 44],
          [17, 50, 22, 1, 51, 23],
          [2, 42, 14, 19, 43, 15],

          // 19
          [3, 141, 113, 4, 142, 114],
          [3, 70, 44, 11, 71, 45],
          [17, 47, 21, 4, 48, 22],
          [9, 39, 13, 16, 40, 14],

          // 20
          [3, 135, 107, 5, 136, 108],
          [3, 67, 41, 13, 68, 42],
          [15, 54, 24, 5, 55, 25],
          [15, 43, 15, 10, 44, 16],

          // 21
          [4, 144, 116, 4, 145, 117],
          [17, 68, 42],
          [17, 50, 22, 6, 51, 23],
          [19, 46, 16, 6, 47, 17],

          // 22
          [2, 139, 111, 7, 140, 112],
          [17, 74, 46],
          [7, 54, 24, 16, 55, 25],
          [34, 37, 13],

          // 23
          [4, 151, 121, 5, 152, 122],
          [4, 75, 47, 14, 76, 48],
          [11, 54, 24, 14, 55, 25],
          [16, 45, 15, 14, 46, 16],

          // 24
          [6, 147, 117, 4, 148, 118],
          [6, 73, 45, 14, 74, 46],
          [11, 54, 24, 16, 55, 25],
          [30, 46, 16, 2, 47, 17],

          // 25
          [8, 132, 106, 4, 133, 107],
          [8, 75, 47, 13, 76, 48],
          [7, 54, 24, 22, 55, 25],
          [22, 45, 15, 13, 46, 16],

          // 26
          [10, 142, 114, 2, 143, 115],
          [19, 74, 46, 4, 75, 47],
          [28, 50, 22, 6, 51, 23],
          [33, 46, 16, 4, 47, 17],

          // 27
          [8, 152, 122, 4, 153, 123],
          [22, 73, 45, 3, 74, 46],
          [8, 53, 23, 26, 54, 24],
          [12, 45, 15, 28, 46, 16],

          // 28
          [3, 147, 117, 10, 148, 118],
          [3, 73, 45, 23, 74, 46],
          [4, 54, 24, 31, 55, 25],
          [11, 45, 15, 31, 46, 16],

          // 29
          [7, 146, 116, 7, 147, 117],
          [21, 73, 45, 7, 74, 46],
          [1, 53, 23, 37, 54, 24],
          [19, 45, 15, 26, 46, 16],

          // 30
          [5, 145, 115, 10, 146, 116],
          [19, 75, 47, 10, 76, 48],
          [15, 54, 24, 25, 55, 25],
          [23, 45, 15, 25, 46, 16],

          // 31
          [13, 145, 115, 3, 146, 116],
          [2, 74, 46, 29, 75, 47],
          [42, 54, 24, 1, 55, 25],
          [23, 45, 15, 28, 46, 16],

          // 32
          [17, 145, 115],
          [10, 74, 46, 23, 75, 47],
          [10, 54, 24, 35, 55, 25],
          [19, 45, 15, 35, 46, 16],

          // 33
          [17, 145, 115, 1, 146, 116],
          [14, 74, 46, 21, 75, 47],
          [29, 54, 24, 19, 55, 25],
          [11, 45, 15, 46, 46, 16],

          // 34
          [13, 145, 115, 6, 146, 116],
          [14, 74, 46, 23, 75, 47],
          [44, 54, 24, 7, 55, 25],
          [59, 46, 16, 1, 47, 17],

          // 35
          [12, 151, 121, 7, 152, 122],
          [12, 75, 47, 26, 76, 48],
          [39, 54, 24, 14, 55, 25],
          [22, 45, 15, 41, 46, 16],

          // 36
          [6, 151, 121, 14, 152, 122],
          [6, 75, 47, 34, 76, 48],
          [46, 54, 24, 10, 55, 25],
          [2, 45, 15, 64, 46, 16],

          // 37
          [17, 152, 122, 4, 153, 123],
          [29, 74, 46, 14, 75, 47],
          [49, 54, 24, 10, 55, 25],
          [24, 45, 15, 46, 46, 16],

          // 38
          [4, 152, 122, 18, 153, 123],
          [13, 74, 46, 32, 75, 47],
          [48, 54, 24, 14, 55, 25],
          [42, 45, 15, 32, 46, 16],

          // 39
          [20, 147, 117, 4, 148, 118],
          [40, 75, 47, 7, 76, 48],
          [43, 54, 24, 22, 55, 25],
          [10, 45, 15, 67, 46, 16],

          // 40
          [19, 148, 118, 6, 149, 119],
          [18, 75, 47, 31, 76, 48],
          [34, 54, 24, 34, 55, 25],
          [20, 45, 15, 61, 46, 16]
        ];

        var qrRSBlock = function(totalCount, dataCount) {
          var _this = {};
          _this.totalCount = totalCount;
          _this.dataCount = dataCount;
          return _this;
        };

        var _this = {};

        var getRsBlockTable = function(typeNumber, errorCorrectionLevel) {

          switch(errorCorrectionLevel) {
          case QRErrorCorrectionLevel.L :
            return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
          case QRErrorCorrectionLevel.M :
            return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
          case QRErrorCorrectionLevel.Q :
            return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
          case QRErrorCorrectionLevel.H :
            return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
          default :
            return undefined;
          }
        };

        _this.getRSBlocks = function(typeNumber, errorCorrectionLevel) {

          var rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);

          if (typeof rsBlock == 'undefined') {
            throw 'bad rs block @ typeNumber:' + typeNumber +
                '/errorCorrectionLevel:' + errorCorrectionLevel;
          }

          var length = rsBlock.length / 3;

          var list = [];

          for (var i = 0; i < length; i += 1) {

            var count = rsBlock[i * 3 + 0];
            var totalCount = rsBlock[i * 3 + 1];
            var dataCount = rsBlock[i * 3 + 2];

            for (var j = 0; j < count; j += 1) {
              list.push(qrRSBlock(totalCount, dataCount) );
            }
          }

          return list;
        };

        return _this;
      }();

      //---------------------------------------------------------------------
      // qrBitBuffer
      //---------------------------------------------------------------------

      var qrBitBuffer = function() {

        var _buffer = [];
        var _length = 0;

        var _this = {};

        _this.getBuffer = function() {
          return _buffer;
        };

        _this.getAt = function(index) {
          var bufIndex = Math.floor(index / 8);
          return ( (_buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
        };

        _this.put = function(num, length) {
          for (var i = 0; i < length; i += 1) {
            _this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
          }
        };

        _this.getLengthInBits = function() {
          return _length;
        };

        _this.putBit = function(bit) {

          var bufIndex = Math.floor(_length / 8);
          if (_buffer.length <= bufIndex) {
            _buffer.push(0);
          }

          if (bit) {
            _buffer[bufIndex] |= (0x80 >>> (_length % 8) );
          }

          _length += 1;
        };

        return _this;
      };

      //---------------------------------------------------------------------
      // qrNumber
      //---------------------------------------------------------------------

      var qrNumber = function(data) {

        var _mode = QRMode.MODE_NUMBER;
        var _data = data;

        var _this = {};

        _this.getMode = function() {
          return _mode;
        };

        _this.getLength = function(buffer) {
          return _data.length;
        };

        _this.write = function(buffer) {

          var data = _data;

          var i = 0;

          while (i + 2 < data.length) {
            buffer.put(strToNum(data.substring(i, i + 3) ), 10);
            i += 3;
          }

          if (i < data.length) {
            if (data.length - i == 1) {
              buffer.put(strToNum(data.substring(i, i + 1) ), 4);
            } else if (data.length - i == 2) {
              buffer.put(strToNum(data.substring(i, i + 2) ), 7);
            }
          }
        };

        var strToNum = function(s) {
          var num = 0;
          for (var i = 0; i < s.length; i += 1) {
            num = num * 10 + chatToNum(s.charAt(i) );
          }
          return num;
        };

        var chatToNum = function(c) {
          if ('0' <= c && c <= '9') {
            return c.charCodeAt(0) - '0'.charCodeAt(0);
          }
          throw 'illegal char :' + c;
        };

        return _this;
      };

      //---------------------------------------------------------------------
      // qrAlphaNum
      //---------------------------------------------------------------------

      var qrAlphaNum = function(data) {

        var _mode = QRMode.MODE_ALPHA_NUM;
        var _data = data;

        var _this = {};

        _this.getMode = function() {
          return _mode;
        };

        _this.getLength = function(buffer) {
          return _data.length;
        };

        _this.write = function(buffer) {

          var s = _data;

          var i = 0;

          while (i + 1 < s.length) {
            buffer.put(
              getCode(s.charAt(i) ) * 45 +
              getCode(s.charAt(i + 1) ), 11);
            i += 2;
          }

          if (i < s.length) {
            buffer.put(getCode(s.charAt(i) ), 6);
          }
        };

        var getCode = function(c) {

          if ('0' <= c && c <= '9') {
            return c.charCodeAt(0) - '0'.charCodeAt(0);
          } else if ('A' <= c && c <= 'Z') {
            return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
          } else {
            switch (c) {
            case ' ' : return 36;
            case '$' : return 37;
            case '%' : return 38;
            case '*' : return 39;
            case '+' : return 40;
            case '-' : return 41;
            case '.' : return 42;
            case '/' : return 43;
            case ':' : return 44;
            default :
              throw 'illegal char :' + c;
            }
          }
        };

        return _this;
      };

      //---------------------------------------------------------------------
      // qr8BitByte
      //---------------------------------------------------------------------

      var qr8BitByte = function(data) {

        var _mode = QRMode.MODE_8BIT_BYTE;
        var _bytes = qrcode.stringToBytes(data);

        var _this = {};

        _this.getMode = function() {
          return _mode;
        };

        _this.getLength = function(buffer) {
          return _bytes.length;
        };

        _this.write = function(buffer) {
          for (var i = 0; i < _bytes.length; i += 1) {
            buffer.put(_bytes[i], 8);
          }
        };

        return _this;
      };

      //---------------------------------------------------------------------
      // qrKanji
      //---------------------------------------------------------------------

      var qrKanji = function(data) {

        var _mode = QRMode.MODE_KANJI;

        var stringToBytes = qrcode.stringToBytesFuncs['SJIS'];
        if (!stringToBytes) {
          throw 'sjis not supported.';
        }
        !function(c, code) {
          // self test for sjis support.
          var test = stringToBytes(c);
          if (test.length != 2 || ( (test[0] << 8) | test[1]) != code) {
            throw 'sjis not supported.';
          }
        }('\u53cb', 0x9746);

        var _bytes = stringToBytes(data);

        var _this = {};

        _this.getMode = function() {
          return _mode;
        };

        _this.getLength = function(buffer) {
          return ~~(_bytes.length / 2);
        };

        _this.write = function(buffer) {

          var data = _bytes;

          var i = 0;

          while (i + 1 < data.length) {

            var c = ( (0xff & data[i]) << 8) | (0xff & data[i + 1]);

            if (0x8140 <= c && c <= 0x9FFC) {
              c -= 0x8140;
            } else if (0xE040 <= c && c <= 0xEBBF) {
              c -= 0xC140;
            } else {
              throw 'illegal char at ' + (i + 1) + '/' + c;
            }

            c = ( (c >>> 8) & 0xff) * 0xC0 + (c & 0xff);

            buffer.put(c, 13);

            i += 2;
          }

          if (i < data.length) {
            throw 'illegal char at ' + (i + 1);
          }
        };

        return _this;
      };

      //=====================================================================
      // GIF Support etc.
      //

      //---------------------------------------------------------------------
      // byteArrayOutputStream
      //---------------------------------------------------------------------

      var byteArrayOutputStream = function() {

        var _bytes = [];

        var _this = {};

        _this.writeByte = function(b) {
          _bytes.push(b & 0xff);
        };

        _this.writeShort = function(i) {
          _this.writeByte(i);
          _this.writeByte(i >>> 8);
        };

        _this.writeBytes = function(b, off, len) {
          off = off || 0;
          len = len || b.length;
          for (var i = 0; i < len; i += 1) {
            _this.writeByte(b[i + off]);
          }
        };

        _this.writeString = function(s) {
          for (var i = 0; i < s.length; i += 1) {
            _this.writeByte(s.charCodeAt(i) );
          }
        };

        _this.toByteArray = function() {
          return _bytes;
        };

        _this.toString = function() {
          var s = '';
          s += '[';
          for (var i = 0; i < _bytes.length; i += 1) {
            if (i > 0) {
              s += ',';
            }
            s += _bytes[i];
          }
          s += ']';
          return s;
        };

        return _this;
      };

      //---------------------------------------------------------------------
      // base64EncodeOutputStream
      //---------------------------------------------------------------------

      var base64EncodeOutputStream = function() {

        var _buffer = 0;
        var _buflen = 0;
        var _length = 0;
        var _base64 = '';

        var _this = {};

        var writeEncoded = function(b) {
          _base64 += String.fromCharCode(encode(b & 0x3f) );
        };

        var encode = function(n) {
          if (n < 0) ; else if (n < 26) {
            return 0x41 + n;
          } else if (n < 52) {
            return 0x61 + (n - 26);
          } else if (n < 62) {
            return 0x30 + (n - 52);
          } else if (n == 62) {
            return 0x2b;
          } else if (n == 63) {
            return 0x2f;
          }
          throw 'n:' + n;
        };

        _this.writeByte = function(n) {

          _buffer = (_buffer << 8) | (n & 0xff);
          _buflen += 8;
          _length += 1;

          while (_buflen >= 6) {
            writeEncoded(_buffer >>> (_buflen - 6) );
            _buflen -= 6;
          }
        };

        _this.flush = function() {

          if (_buflen > 0) {
            writeEncoded(_buffer << (6 - _buflen) );
            _buffer = 0;
            _buflen = 0;
          }

          if (_length % 3 != 0) {
            // padding
            var padlen = 3 - _length % 3;
            for (var i = 0; i < padlen; i += 1) {
              _base64 += '=';
            }
          }
        };

        _this.toString = function() {
          return _base64;
        };

        return _this;
      };

      //---------------------------------------------------------------------
      // base64DecodeInputStream
      //---------------------------------------------------------------------

      var base64DecodeInputStream = function(str) {

        var _str = str;
        var _pos = 0;
        var _buffer = 0;
        var _buflen = 0;

        var _this = {};

        _this.read = function() {

          while (_buflen < 8) {

            if (_pos >= _str.length) {
              if (_buflen == 0) {
                return -1;
              }
              throw 'unexpected end of file./' + _buflen;
            }

            var c = _str.charAt(_pos);
            _pos += 1;

            if (c == '=') {
              _buflen = 0;
              return -1;
            } else if (c.match(/^\s$/) ) {
              // ignore if whitespace.
              continue;
            }

            _buffer = (_buffer << 6) | decode(c.charCodeAt(0) );
            _buflen += 6;
          }

          var n = (_buffer >>> (_buflen - 8) ) & 0xff;
          _buflen -= 8;
          return n;
        };

        var decode = function(c) {
          if (0x41 <= c && c <= 0x5a) {
            return c - 0x41;
          } else if (0x61 <= c && c <= 0x7a) {
            return c - 0x61 + 26;
          } else if (0x30 <= c && c <= 0x39) {
            return c - 0x30 + 52;
          } else if (c == 0x2b) {
            return 62;
          } else if (c == 0x2f) {
            return 63;
          } else {
            throw 'c:' + c;
          }
        };

        return _this;
      };

      //---------------------------------------------------------------------
      // gifImage (B/W)
      //---------------------------------------------------------------------

      var gifImage = function(width, height) {

        var _width = width;
        var _height = height;
        var _data = new Array(width * height);

        var _this = {};

        _this.setPixel = function(x, y, pixel) {
          _data[y * _width + x] = pixel;
        };

        _this.write = function(out) {

          //---------------------------------
          // GIF Signature

          out.writeString('GIF87a');

          //---------------------------------
          // Screen Descriptor

          out.writeShort(_width);
          out.writeShort(_height);

          out.writeByte(0x80); // 2bit
          out.writeByte(0);
          out.writeByte(0);

          //---------------------------------
          // Global Color Map

          // black
          out.writeByte(0x00);
          out.writeByte(0x00);
          out.writeByte(0x00);

          // white
          out.writeByte(0xff);
          out.writeByte(0xff);
          out.writeByte(0xff);

          //---------------------------------
          // Image Descriptor

          out.writeString(',');
          out.writeShort(0);
          out.writeShort(0);
          out.writeShort(_width);
          out.writeShort(_height);
          out.writeByte(0);

          //---------------------------------
          // Local Color Map

          //---------------------------------
          // Raster Data

          var lzwMinCodeSize = 2;
          var raster = getLZWRaster(lzwMinCodeSize);

          out.writeByte(lzwMinCodeSize);

          var offset = 0;

          while (raster.length - offset > 255) {
            out.writeByte(255);
            out.writeBytes(raster, offset, 255);
            offset += 255;
          }

          out.writeByte(raster.length - offset);
          out.writeBytes(raster, offset, raster.length - offset);
          out.writeByte(0x00);

          //---------------------------------
          // GIF Terminator
          out.writeString(';');
        };

        var bitOutputStream = function(out) {

          var _out = out;
          var _bitLength = 0;
          var _bitBuffer = 0;

          var _this = {};

          _this.write = function(data, length) {

            if ( (data >>> length) != 0) {
              throw 'length over';
            }

            while (_bitLength + length >= 8) {
              _out.writeByte(0xff & ( (data << _bitLength) | _bitBuffer) );
              length -= (8 - _bitLength);
              data >>>= (8 - _bitLength);
              _bitBuffer = 0;
              _bitLength = 0;
            }

            _bitBuffer = (data << _bitLength) | _bitBuffer;
            _bitLength = _bitLength + length;
          };

          _this.flush = function() {
            if (_bitLength > 0) {
              _out.writeByte(_bitBuffer);
            }
          };

          return _this;
        };

        var getLZWRaster = function(lzwMinCodeSize) {

          var clearCode = 1 << lzwMinCodeSize;
          var endCode = (1 << lzwMinCodeSize) + 1;
          var bitLength = lzwMinCodeSize + 1;

          // Setup LZWTable
          var table = lzwTable();

          for (var i = 0; i < clearCode; i += 1) {
            table.add(String.fromCharCode(i) );
          }
          table.add(String.fromCharCode(clearCode) );
          table.add(String.fromCharCode(endCode) );

          var byteOut = byteArrayOutputStream();
          var bitOut = bitOutputStream(byteOut);

          // clear code
          bitOut.write(clearCode, bitLength);

          var dataIndex = 0;

          var s = String.fromCharCode(_data[dataIndex]);
          dataIndex += 1;

          while (dataIndex < _data.length) {

            var c = String.fromCharCode(_data[dataIndex]);
            dataIndex += 1;

            if (table.contains(s + c) ) {

              s = s + c;

            } else {

              bitOut.write(table.indexOf(s), bitLength);

              if (table.size() < 0xfff) {

                if (table.size() == (1 << bitLength) ) {
                  bitLength += 1;
                }

                table.add(s + c);
              }

              s = c;
            }
          }

          bitOut.write(table.indexOf(s), bitLength);

          // end code
          bitOut.write(endCode, bitLength);

          bitOut.flush();

          return byteOut.toByteArray();
        };

        var lzwTable = function() {

          var _map = {};
          var _size = 0;

          var _this = {};

          _this.add = function(key) {
            if (_this.contains(key) ) {
              throw 'dup key:' + key;
            }
            _map[key] = _size;
            _size += 1;
          };

          _this.size = function() {
            return _size;
          };

          _this.indexOf = function(key) {
            return _map[key];
          };

          _this.contains = function(key) {
            return typeof _map[key] != 'undefined';
          };

          return _this;
        };

        return _this;
      };

      var createDataURL = function(width, height, getPixel) {
        var gif = gifImage(width, height);
        for (var y = 0; y < height; y += 1) {
          for (var x = 0; x < width; x += 1) {
            gif.setPixel(x, y, getPixel(x, y) );
          }
        }

        var b = byteArrayOutputStream();
        gif.write(b);

        var base64 = base64EncodeOutputStream();
        var bytes = b.toByteArray();
        for (var i = 0; i < bytes.length; i += 1) {
          base64.writeByte(bytes[i]);
        }
        base64.flush();

        return 'data:image/gif;base64,' + base64;
      };

      //---------------------------------------------------------------------
      // returns qrcode function.

      return qrcode;
    }();

    // multibyte support
    !function() {

      qrcode.stringToBytesFuncs['UTF-8'] = function(s) {
        // http://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array
        function toUTF8Array(str) {
          var utf8 = [];
          for (var i=0; i < str.length; i++) {
            var charcode = str.charCodeAt(i);
            if (charcode < 0x80) utf8.push(charcode);
            else if (charcode < 0x800) {
              utf8.push(0xc0 | (charcode >> 6),
                  0x80 | (charcode & 0x3f));
            }
            else if (charcode < 0xd800 || charcode >= 0xe000) {
              utf8.push(0xe0 | (charcode >> 12),
                  0x80 | ((charcode>>6) & 0x3f),
                  0x80 | (charcode & 0x3f));
            }
            // surrogate pair
            else {
              i++;
              // UTF-16 encodes 0x10000-0x10FFFF by
              // subtracting 0x10000 and splitting the
              // 20 bits of 0x0-0xFFFFF into two halves
              charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                | (str.charCodeAt(i) & 0x3ff));
              utf8.push(0xf0 | (charcode >>18),
                  0x80 | ((charcode>>12) & 0x3f),
                  0x80 | ((charcode>>6) & 0x3f),
                  0x80 | (charcode & 0x3f));
            }
          }
          return utf8;
        }
        return toUTF8Array(s);
      };

    }();

    (function (factory) {
      {
          module.exports = factory();
      }
    }(function () {
        return qrcode;
    }));
    });

    var Qr = /** @class */ (function (_super) {
        __extends(Qr, _super);
        function Qr(options) {
            return _super.call(this, options) || this;
        }
        Qr.prototype.render = function (options) {
            var qr = qrcode_1(0, 'L');
            qr.addData(options.href);
            qr.make();
            var qrImage = qr.createImgTag(3, 7);
            var wrapper = document.createElement('div');
            wrapper.innerHTML = "<div style=\"display:flex;padding:15px;background:#fff;border-radius:10px\"><div class=\"own-id-qr-code\" style=\"margin-right:25px\">" + qrImage + "</div><div style=\"display:flex;flex-direction:column;justify-content:space-between;flex:1;\"><div><div style=\"font-family:'SF Compact Text',sans-serif;font-weight:bold;font-size:20px;line-height:32px;margin-bottom:4px;\">" + options.title + "</div><div style=\"font-family:'SF Compact Text',sans-serif;font-weight:500;font-size:16px;line-height:24px;\">" + options.subtitle + "</div></div><div><a href=\"https://ownid.com/\" style=\"text-decoration:none;display:flex;justify-content:flex-end;\"><span style=\"font-family:'SF Pro Text',sans-serif;font-weight:500;font-size:12px;line-height:24px;color:#ACACAC;margin-right:5px;\">What is this?</span><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"#030303\"><path d=\"M4.16 8.322a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776L9.108.368c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776L5.052 7.95a1.25 1.25 0 0 1-.891.371zm7.116-1.286a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776l1.662-1.657c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776l-1.675 1.67a1.24 1.24 0 0 1-.878.358zm-7.154 7.132a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776l4.242-4.23c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776l-4.242 4.23a1.23 1.23 0 0 1-.891.371zm2.9 2.877a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776l1.795-1.8c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776l-1.795 1.8c-.24.252-.56.37-.9.37zm4.708-4.695a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776l4.1-4.096c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776l-4.1 4.096c-.24.252-.56.37-.9.37zM1.25 11.2A1.25 1.25 0 0 0 2.5 9.965a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 1.25 1.246zM9.906 20a1.25 1.25 0 0 1-.891-.371c-.492-.5-.492-1.286 0-1.776l5.944-5.925c.492-.5 1.3-.5 1.782 0s.492 1.286 0 1.776l-5.944 5.926a1.25 1.25 0 0 1-.891.371zm8.844-8.815a1.25 1.25 0 1 0-1.25-1.246 1.25 1.25 0 0 0 1.25 1.246z\"/></svg></a></div></div></div>";
            return wrapper;
        };
        return Qr;
    }(BaseCommonComponent));

    var WidgetType;
    (function (WidgetType) {
        WidgetType["Register"] = "register";
        WidgetType["Login"] = "login";
    })(WidgetType || (WidgetType = {}));
    var Languages;
    (function (Languages) {
        Languages["en"] = "en";
        Languages["enGB"] = "en-GB";
        Languages["enUS"] = "en-US";
        Languages["ru"] = "ru";
        Languages["es"] = "es";
    })(Languages || (Languages = {}));

    // todo: implement in correct way
    var ConfigurationService = /** @class */ (function () {
        function ConfigurationService() {
        }
        ConfigurationService.URLPrefix = '/ownid';
        ConfigurationService.statusUrl = "/:context/status";
        ConfigurationService.statusTimeout = 2000;
        ConfigurationService.defaultLanguage = Languages.en;
        return ConfigurationService;
    }());

    var _a, _b, _c;
    var TranslationService = /** @class */ (function () {
        function TranslationService() {
        }
        TranslationService.texts = (_a = {},
            _a[Languages.en] = (_b = {},
                _b[WidgetType.Login] = {
                    mobileTitle: 'Instant Sign In',
                    desktopTitle: 'Instant Sign In',
                    desktopSubtitle: 'Use your phone to scan for passwordless sign in.',
                },
                _b[WidgetType.Register] = {
                    mobileTitle: 'Register without a password',
                    desktopTitle: 'Skip the password with OwnID',
                    desktopSubtitle: 'Use your phone to scan and complete a passwordless registration.',
                },
                _b),
            _a[Languages.ru] = (_c = {},
                _c[WidgetType.Login] = {
                    mobileTitle: 'Мгновенный вход',
                    desktopTitle: 'Мгновенный вход',
                    desktopSubtitle: 'Используйте свой телефон для сканирования и входа без пароля.',
                },
                _c[WidgetType.Register] = {
                    mobileTitle: 'Зарегистрироваться без пароля',
                    desktopTitle: 'Пропустить пароль с OwnID',
                    desktopSubtitle: 'Используйте свой телефон для сканирования и завершения регистрации без пароля.',
                },
                _c),
            _a);
        return TranslationService;
    }());

    var WidgetComponent = /** @class */ (function (_super) {
        __extends(WidgetComponent, _super);
        function WidgetComponent(config, requestService) {
            var _this = _super.call(this, config) || this;
            _this.config = config;
            _this.requestService = requestService;
            _this.statusTimeout = null;
            _this.data = null;
            _this.widgetReady = _this.getContext(config.URLPrefix || ConfigurationService.URLPrefix);
            return _this;
        }
        WidgetComponent.prototype.getContext = function (contextUrl) {
            return __awaiter(this, void 0, void 0, function () {
                var contextData, _a, prefix, statusUrl;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            contextData = { type: this.config.type || WidgetType.Register };
                            _a = this;
                            return [4 /*yield*/, this.requestService.post(contextUrl, contextData)];
                        case 1:
                            _a.data = _b.sent();
                            if (!this.data) {
                                // eslint-disable-next-line no-console
                                console.error('No context data received');
                                return [2 /*return*/];
                            }
                            this.context = this.data.context;
                            this.nonce = this.data.nonce;
                            prefix = (this.config.URLPrefix || ConfigurationService.URLPrefix).replace(/\/+$/, '');
                            statusUrl = ("" + prefix + ConfigurationService.statusUrl)
                                .replace(':context', this.context);
                            this.setCallStatus(statusUrl);
                            this.render();
                            return [2 /*return*/];
                    }
                });
            });
        };
        WidgetComponent.prototype.render = function () {
            var lang = this.config.language || ConfigurationService.defaultLanguage;
            if (this.isMobile()) {
                var mobileTitle = this.config.mobileTitle || TranslationService.texts[lang][this.config.type].mobileTitle;
                this.addChild(new LinkButton({ href: this.data.url, title: mobileTitle }));
            }
            else {
                var desktopTitle = this.config.desktopTitle || TranslationService.texts[lang][this.config.type].desktopTitle;
                var desktopSubtitle = this.config.desktopTitle || TranslationService.texts[lang][this.config.type].desktopSubtitle;
                this.addChild(new Qr({ href: this.data.url, title: desktopTitle, subtitle: desktopSubtitle }));
            }
        };
        WidgetComponent.prototype.setCallStatus = function (statusUrl) {
            var _this = this;
            this.statusTimeout = setTimeout(function () { return _this.callStatus(statusUrl); }, this.config.statusInterval || ConfigurationService.statusTimeout);
        };
        WidgetComponent.prototype.callStatus = function (statusUrl) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.requestService.post(statusUrl, { nonce: this.nonce })];
                        case 1:
                            response = _a.sent();
                            if (response.status) {
                                clearTimeout(this.statusTimeout);
                                return [2 /*return*/, this.config.type === WidgetType.Login
                                        ? this.config.onLogin && this.config.onLogin(response)
                                        : this.config.onRegister && this.config.onRegister(response)];
                            }
                            return [2 /*return*/, this.setCallStatus(statusUrl)];
                    }
                });
            });
        };
        WidgetComponent.prototype.destroy = function () {
            clearTimeout(this.statusTimeout);
            this.elements.forEach(function (element) { return element.destroy(); });
        };
        WidgetComponent.prototype.update = function (config) {
            this.elements.forEach(function (element) { return element.destroy(); });
            this.config = __assign(__assign({}, this.config), config);
            this.render();
        };
        return WidgetComponent;
    }(BaseComponent));

    var RequestService = /** @class */ (function () {
        function RequestService() {
        }
        RequestService.prototype.post = function (url, data) {
            if (data === void 0) { data = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                mode: 'cors',
                                cache: 'no-cache',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                redirect: 'follow',
                                referrerPolicy: 'no-referrer',
                                body: JSON.stringify(data)
                            })];
                        case 1:
                            response = _a.sent();
                            if (response.ok) {
                                return [2 /*return*/, response.json()];
                            }
                            return [2 /*return*/, null];
                    }
                });
            });
        };
        return RequestService;
    }());

    var OwnIDUiSdk = /** @class */ (function () {
        function OwnIDUiSdk() {
            this.config = {};
        }
        OwnIDUiSdk.prototype.init = function (config) {
            if (config === void 0) { config = {}; }
            this.config = config;
        };
        OwnIDUiSdk.prototype.render = function (config) {
            if (!config.element) {
                // eslint-disable-next-line no-console
                console.error("Parent element wasn't found on the page");
                return null;
            }
            return new WidgetComponent(__assign(__assign({}, this.config), config), new RequestService());
        };
        return OwnIDUiSdk;
    }());

    window.ownid = window.ownid instanceof OwnIDUiSdk ? window.ownid : new OwnIDUiSdk();
    if (window.ownidAsyncInit) {
        window.ownidAsyncInit();
    }
    else {
        console.log('ownid sdk is not initialized, ownidAsyncInit fucntion was not found');
    }

})));
//# sourceMappingURL=ownid-web-ui-sdk.umd.js.map
