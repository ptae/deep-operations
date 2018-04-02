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

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

var isPrimitive = function (arg) { return arg !== Object(arg); };
var unique = function (arrArg) {
    return arrArg.filter(function (elem, pos, arr) {
        // tslint:disable-next-line
        return arr.indexOf(elem) == pos;
    });
};
var isBothObject = function (objOne, objTwo, key) {
    return objOne[key] &&
        typeof objOne[key] === 'object' &&
        (objTwo[key] && typeof objTwo[key] === 'object');
};
var isBothArray = function (objOne, objTwo, key) {
    return objOne[key] && Array.isArray(objOne[key]) && (objTwo[key] && Array.isArray(objTwo[key]));
};

var deepMergeTwoObjects = function (objOne, objTwo) {
    var objOneKeys = Object.keys(objOne);
    var objTwoKeys = Object.keys(objTwo);
    return objTwoKeys.reduce(function (accumulator, currKey) {
        var oneHasKey = objOneKeys.includes(currKey);
        var isArray = isBothArray(objOne, objTwo, currKey);
        var isObject = isBothObject(objOne, objTwo, currKey);
        var mergeArrays = function () { return unique(objOne[currKey].concat(objTwo[currKey])); };
        var mergeObject = function () { return isObject && deepMergeTwoObjects(objOne[currKey], objTwo[currKey]); };
        var mergedObject = isArray ? mergeArrays() : mergeObject();
        var result = isPrimitive(objTwo[currKey]) ? objTwo[currKey] : mergedObject;
        var putIfNew = !oneHasKey ? objTwo[currKey] : result;
        return __assign({}, accumulator, (_a = {}, _a[currKey] = putIfNew, _a));
        var _a;
    }, {});
};
var sortObjKeys = function (obj) {
    var orederedKeys = Object.keys(obj).sort();
    return orederedKeys.reduce(function (accumulator, currVal) {
        return __assign({}, accumulator, (_a = {}, _a[currVal] = obj[currVal], _a));
        var _a;
    }, {});
};
var flatValues = function (obj) {
    var alreadyArray = Array.isArray(obj);
    var values = alreadyArray ? obj : Object.values(obj);
    return values.reduce(function (accumulator, currVal) {
        var isObject = typeof currVal === 'object' && !Array.isArray(currVal);
        var turnToArray = isObject ? flatValues(currVal) : [currVal];
        return accumulator.concat(turnToArray);
    }, []);
};
/**
 * Will mount a diff between two objects
 */
var objectDiff = function (objOne, objTwo, _a) {
    var _b = (_a === void 0 ? {} : _a).shallow, shallow = _b === void 0 ? false : _b;
    var keysOne = Object.keys(objOne);
    var keysTwo = Object.keys(objTwo);
    var CHANGED = 'changed';
    var NOT_CHANGED = 'not changed';
    var NEW_KEY = 'new key';
    var diffObject = keysTwo.reduce(function (accumulator, currVal) {
        var hasKey = keysOne.includes(currVal);
        var isChanged = hasKey &&
            JSON.stringify(sortObjKeys(objOne[currVal])) !== JSON.stringify(sortObjKeys(objTwo[currVal]));
        var diffValue = isChanged ? CHANGED : NOT_CHANGED;
        var defineIfIsNew = hasKey ? diffValue : NEW_KEY;
        var isObject = isBothObject(objOne, objTwo, currVal);
        var recursiveStrategy = function () {
            return isObject ? objectDiff(objOne[currVal], objTwo[currVal], { shallow: shallow })[0] : defineIfIsNew;
        };
        var diffStrategy = function () { return (shallow ? defineIfIsNew : recursiveStrategy()); };
        return __assign({}, accumulator, (_a = {}, _a[currVal] = diffStrategy(), _a));
        var _a;
    }, {});
    var diffFlat = flatValues(diffObject);
    var hasDiff = diffFlat.includes(CHANGED) || diffFlat.includes(NEW_KEY);
    return [diffObject, hasDiff];
};
/**
 * Deep merges a list of objects
 * @param { vararg } objs list of objects to merge
 * @returns a single object with merged values
 *
 * @example
 *
 * const obj1 = {
 *  name: 'example1'
 *  random: 'random1'
 * };
 *
 * const obj2 = {
 *  name: 'example2'
 *  random: 'random1'
 * };
 *
 * const obj3 = {
 *  name: 'example2'
 *  random: 'random1',
 *  newKey: 'newKey',
 * };
 *
 * const mergedObject = deepMerge(obj1, obj2, obj3);
 * // => { name: 'example2', random: 'random1', newKey: 'newKey' }
 */
var deepMerge = function () {
    var objs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objs[_i] = arguments[_i];
    }
    var firstObject = __assign({}, objs[0]);
    return objs.reduce(function (accumulator, currVal) { return deepMergeTwoObjects(accumulator, currVal); }, firstObject);
};
var deepOperations = {
    objectDiff: objectDiff,
    deepMerge: deepMerge,
    flatValues: flatValues,
    sortObjKeys: sortObjKeys
};

export default deepOperations;
export { sortObjKeys, flatValues, objectDiff, deepMerge };
