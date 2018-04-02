"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrimitive = function (arg) { return arg !== Object(arg); };
exports.unique = function (arrArg) {
    return arrArg.filter(function (elem, pos, arr) {
        // tslint:disable-next-line
        return arr.indexOf(elem) == pos;
    });
};
exports.isBothObject = function (objOne, objTwo, key) {
    return objOne[key] &&
        typeof objOne[key] === 'object' &&
        (objTwo[key] && typeof objTwo[key] === 'object');
};
exports.isBothArray = function (objOne, objTwo, key) {
    return objOne[key] && Array.isArray(objOne[key]) && (objTwo[key] && Array.isArray(objTwo[key]));
};
//# sourceMappingURL=utils.js.map