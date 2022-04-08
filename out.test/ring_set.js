"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var RingSet = /** @class */ (function () {
    function RingSet(initial) {
        if (initial === void 0) { initial = []; }
        this._set = new Set(initial);
    }
    Object.defineProperty(RingSet.prototype, "length", {
        get: function () { return this._set.size; },
        enumerable: false,
        configurable: true
    });
    ;
    /**
     * Appends a value to the ring.
     * @param value to append
     */
    RingSet.prototype.append = function (value) {
        this._set.add(value);
    };
    /**
     * Prepends a value to the ring.
     * @param value to prepend
     */
    RingSet.prototype.prepend = function (value) {
        this._set = new Set(__spreadArray([value], __read(this._set), false));
    };
    RingSet.prototype.produceIterator = function () {
        return function (values) {
            var valueList, index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        valueList = __spreadArray([], __read(values), false);
                        index = 0;
                        _a.label = 1;
                    case 1: return [4 /*yield*/, valueList[index % valueList.length]];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }(this._set.values());
    };
    RingSet.prototype.iterator = function () {
        return this.produceIterator();
    };
    /**
     * Calls the given callback for each element.
     * @param callbackfn to call on each element
     * @param thisArg object, that will be referenced with 'this' inside callback
     */
    RingSet.prototype.forEach = function (callbackfn, thisArg) {
        this._set.forEach(callbackfn, thisArg);
    };
    return RingSet;
}());
exports.default = RingSet;
