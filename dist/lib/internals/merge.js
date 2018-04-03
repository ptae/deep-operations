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
var utils_1 = require("./../utils");
var parseArraysToIndexObjects = function (arrayOne, arrayTwo, indexKey) {
    return [utils_1.normalize(arrayOne, indexKey), utils_1.normalize(arrayTwo, indexKey)];
};
var mergeObjectsOptions = {
    mergeObjectIntoArrays: false,
    indexKeyOnArrays: ''
};
/**
 * It will merge only two objects
 */
exports.deepMergeTwoObjects = function (objOne, objTwo, options) {
    if (options === void 0) { options = mergeObjectsOptions; }
    var indexKeyOnArrays = options.indexKeyOnArrays, mergeObjectIntoArrays = options.mergeObjectIntoArrays;
    var objOneKeys = Object.keys(objOne);
    var objTwoKeys = Object.keys(objTwo);
    return objTwoKeys.reduce(function (accumulator, currKey) {
        var oneHasKey = objOneKeys.includes(currKey);
        var isArray = utils_1.isBothArray(objOne, objTwo, currKey);
        var isObject = utils_1.isBothObject(objOne, objTwo, currKey);
        var concatArrays = function () { return utils_1.unique(objOne[currKey].concat(objTwo[currKey])); };
        var mergeObject = function () { return isObject && exports.deepMergeTwoObjects(objOne[currKey], objTwo[currKey]); };
        var concatOrMerge = function () {
            return mergeObjectIntoArrays &&
                !utils_1.containsOnlyPrimitives(objOne[currKey]) &&
                !utils_1.containsOnlyPrimitives(objTwo[currKey])
                ? Object.values(mergeArrayObjects(objOne[currKey], objTwo[currKey], indexKeyOnArrays))
                : concatArrays();
        };
        var mergedObject = isArray ? concatOrMerge() : mergeObject();
        var result = utils_1.isPrimitive(objTwo[currKey]) ? objTwo[currKey] : mergedObject;
        var putIfNew = !oneHasKey ? objTwo[currKey] : result;
        return __assign({}, accumulator, (_a = {}, _a[currKey] = putIfNew, _a));
        var _a;
    }, {});
};
var mergeArrayObjects = function (arrayOne, arrayTwo, indexKey) {
    var _a = parseArraysToIndexObjects(arrayOne, arrayTwo, indexKey), indexedOne = _a[0], indexedTwo = _a[1];
    return exports.deepMergeTwoObjects(indexedOne, indexedTwo, {
        indexKeyOnArrays: indexKey,
        mergeObjectIntoArrays: true
    });
};
//# sourceMappingURL=merge.js.map