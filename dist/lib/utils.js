"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrimitive = function (arg) { return arg !== Object(arg); };
exports.containsOnlyPrimitives = function (array) {
    return array.reduce(function (accumulator, currentVal) {
        return accumulator && exports.isPrimitive(currentVal);
    }, true);
};
exports.unique = function (arrArg) {
    return arrArg.filter(function (elem, pos, arr) {
        // tslint:disable-next-line
        return arr.indexOf(elem) == pos;
    });
};
exports.isBothObject = function (objOne, objTwo, key) {
    return objOne[key] && typeof objOne[key] === 'object' && (objTwo[key] && typeof objTwo[key] === 'object');
};
exports.isBothArray = function (objOne, objTwo, key) {
    return objOne[key] && Array.isArray(objOne[key]) && (objTwo[key] && Array.isArray(objTwo[key]));
};
exports.normalize = function (elements, key) {
    if (elements === void 0) { elements = []; }
    if (key === void 0) { key = ''; }
    if (elements.length === 0) {
        throw new Error("Array doesn't contains elements");
    }
    if (!(key in elements[0])) {
        throw new Error("Object to normalize doesn't contains the key " + key);
    }
    return elements.reduce(function (accumulator, currVal) {
        return (__assign({}, accumulator, (_a = {}, _a[currVal[key]] = currVal, _a)));
        var _a;
    }, {});
};
//# sourceMappingURL=utils.js.map