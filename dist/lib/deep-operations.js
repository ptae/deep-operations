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
var deepMergeTwoObjects = function (objOne, objTwo) {
    var objOneKeys = Object.keys(objOne);
    var objTwoKeys = Object.keys(objTwo);
    return objTwoKeys.reduce(function (accumulator, currKey) {
        var oneHasKey = objOneKeys.includes(currKey);
        var isArray = utils_1.isBothArray(objOne, objTwo, currKey);
        var isObject = utils_1.isBothObject(objOne, objTwo, currKey);
        var mergeArrays = function () { return utils_1.unique(objOne[currKey].concat(objTwo[currKey])); };
        var mergeObject = function () { return isObject && deepMergeTwoObjects(objOne[currKey], objTwo[currKey]); };
        var mergedObject = isArray ? mergeArrays() : mergeObject();
        var result = utils_1.isPrimitive(objTwo[currKey]) ? objTwo[currKey] : mergedObject;
        var putIfNew = !oneHasKey ? objTwo[currKey] : result;
        return __assign({}, accumulator, (_a = {}, _a[currKey] = putIfNew, _a));
        var _a;
    }, {});
};
exports.sortObjKeys = function (obj) {
    var orederedKeys = Object.keys(obj).sort();
    return orederedKeys.reduce(function (accumulator, currVal) {
        return __assign({}, accumulator, (_a = {}, _a[currVal] = obj[currVal], _a));
        var _a;
    }, {});
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
 * @param { vararg } objs list of objects to merge
 * @returns a single object with merged values
 *
 */
exports.deepMerge = function () {
    var objs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objs[_i] = arguments[_i];
    }
    var firstObject = __assign({}, objs[0]);
    return objs.reduce(function (accumulator, currVal) { return deepMergeTwoObjects(accumulator, currVal); }, firstObject);
};
exports.default = {
    objectDiff: exports.objectDiff,
    deepMerge: exports.deepMerge,
    flatValues: exports.flatValues,
    sortObjKeys: exports.sortObjKeys
};
//# sourceMappingURL=deep-operations.js.map