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
var utils_1 = require("./utils");
var merge_1 = require("./internals/merge");
exports.sortObjKeys = function (obj) {
    if (typeof obj !== 'undefined') {
        var orederedKeys = Object.keys(obj).sort();
        return orederedKeys.reduce(function (accumulator, currVal) {
            return __assign({}, accumulator, (_a = {}, _a[currVal] = obj[currVal], _a));
            var _a;
        }, {});
    }
    return obj;
};
exports.flatValues = function (obj) {
    var alreadyArray = Array.isArray(obj);
    var values = alreadyArray ? obj : Object.values(obj);
    return values.reduce(function (accumulator, currVal) {
        var isObject = typeof currVal === 'object' && !Array.isArray(currVal);
        var turnToArray = isObject ? exports.flatValues(currVal) : [currVal];
        return accumulator.concat(turnToArray);
    }, []);
};
/**
 * Will mount a diff between two objects
 */
exports.objectDiff = function (objOne, objTwo, _a) {
    var _b = (_a === void 0 ? {} : _a).shallow, shallow = _b === void 0 ? false : _b;
    var keysOne = Object.keys(objOne);
    var keysTwo = Object.keys(objTwo);
    var CHANGED = 'changed';
    var NOT_CHANGED = 'not changed';
    var NEW_KEY = 'new key';
    var diffObject = keysTwo.reduce(function (accumulator, currVal) {
        var hasKey = keysOne.includes(currVal);
        var isChanged = hasKey &&
            JSON.stringify(exports.sortObjKeys(objOne[currVal])) !== JSON.stringify(exports.sortObjKeys(objTwo[currVal]));
        var diffValue = isChanged ? CHANGED : NOT_CHANGED;
        var defineIfIsNew = hasKey ? diffValue : NEW_KEY;
        var isObject = utils_1.isBothObject(objOne, objTwo, currVal);
        var recursiveStrategy = function () {
            return isObject ? exports.objectDiff(objOne[currVal], objTwo[currVal], { shallow: shallow })[0] : defineIfIsNew;
        };
        var diffStrategy = function () { return (shallow ? defineIfIsNew : recursiveStrategy()); };
        return __assign({}, accumulator, (_a = {}, _a[currVal] = diffStrategy(), _a));
        var _a;
    }, {});
    var diffFlat = exports.flatValues(diffObject);
    var hasDiff = diffFlat.includes(CHANGED) || diffFlat.includes(NEW_KEY);
    return [diffObject, hasDiff];
};
/**
 * Deep merges a list of objects
 * @param { Object } options options to costumize objects merge
 * @param { Array } objs list of objects to merge
 * @returns a single object with merged values
 */
exports.deepMerge = function (options) {
    if (typeof options.objects === 'undefined') {
        throw new Error('Objects cannot be undefined.');
    }
    var firstObject = __assign({}, options.objects[0]);
    return options.objects.reduce(function (accumulator, currVal) { return merge_1.deepMergeTwoObjects(accumulator, currVal, options); }, firstObject);
};
exports.default = {
    objectDiff: exports.objectDiff,
    deepMerge: exports.deepMerge,
    flatValues: exports.flatValues,
    sortObjKeys: exports.sortObjKeys
};
//# sourceMappingURL=deep-operations.js.map