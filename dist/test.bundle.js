/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/tests.spec.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.deepMerge = exports.deepMergeTwoObjects = exports.objectDiff = void 0;\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nvar isPrimitive = function isPrimitive(arg) {\n  return arg !== Object(arg);\n};\n\nvar unique = function unique(arrArg) {\n  return arrArg.filter(function (elem, pos, arr) {\n    return arr.indexOf(elem) == pos;\n  });\n};\n\nvar bothIsObject = function bothIsObject(objOne, objTwo, key) {\n  return objOne[key] && _typeof(objOne[key]) === 'object' && objTwo[key] && _typeof(objTwo[key]) === 'object';\n};\n\nvar bothIsArray = function bothIsArray(objOne, objTwo, key) {\n  return objOne[key] && Array.isArray(objOne[key]) && objTwo[key] && Array.isArray(objTwo[key]);\n};\n\nvar flatValues = function flatValues(obj) {\n  var alreadyArray = Array.isArray(obj);\n  var values = alreadyArray ? obj : Object.values(obj);\n  return values.reduce(function (accumulator, currVal) {\n    var isObject = _typeof(currVal) === 'object' && !Array.isArray(currVal);\n    var turnToArray = isObject ? flatValues(currVal) : [currVal];\n    return _toConsumableArray(accumulator).concat(_toConsumableArray(turnToArray));\n  }, []);\n};\n\nvar objectDiff = function objectDiff(objOne, objTwo, _ref) {\n  var _ref$shallow = _ref.shallow,\n      shallow = _ref$shallow === void 0 ? false : _ref$shallow;\n  var keysOne = Object.keys(objOne);\n  var keysTwo = Object.keys(objTwo);\n  var CHANGED = 'changed';\n  var NOT_CHANGED = 'not changed';\n  var NEW_KEY = 'new key';\n  var diffObject = keysTwo.reduce(function (accumulator, currVal) {\n    var hasKey = keysOne.includes(currVal);\n    var isChanged = hasKey && JSON.stringify(objOne[currVal]) !== JSON.stringify(objTwo[currVal]);\n    var diffValue = isChanged ? CHANGED : NOT_CHANGED;\n    var defineIfIsNew = hasKey ? diffValue : NEW_KEY;\n    var isObject = bothIsObject(objOne, objTwo, currVal);\n\n    var recursiveStrategy = function recursiveStrategy() {\n      return isObject ? objectDiff(objOne[currVal], objTwo[currVal], {\n        shallow: shallow\n      })[0] : defineIfIsNew;\n    };\n\n    var diffStrategy = function diffStrategy() {\n      return shallow ? defineIfIsNew : recursiveStrategy();\n    };\n\n    return _objectSpread({}, accumulator, _defineProperty({}, currVal, diffStrategy()));\n  }, {});\n  var diffFlat = flatValues(diffObject);\n  var hasDiff = diffFlat.includes(CHANGED) || diffFlat.includes(NEW_KEY);\n  return [diffObject, hasDiff];\n};\n\nexports.objectDiff = objectDiff;\n\nvar deepMergeTwoObjects = function deepMergeTwoObjects(objOne, objTwo) {\n  var objOneKeys = Object.keys(objOne);\n  var objTwoKeys = Object.keys(objTwo);\n  return objTwoKeys.reduce(function (accumulator, currKey) {\n    var oneHasKey = objOneKeys.includes(currKey);\n    var isArray = bothIsArray(objOne, objTwo, currKey);\n    var isObject = bothIsObject(objOne, objTwo, currKey);\n\n    var mergeArrays = function mergeArrays() {\n      return unique(objOne[currKey].concat(objTwo[currKey]));\n    };\n\n    var mergeObject = function mergeObject() {\n      return isObject && deepMergeTwoObjects(objOne[currKey], objTwo[currKey]);\n    };\n\n    var mergedObject = isArray ? mergeArrays() : mergeObject();\n    var result = isPrimitive(objTwo[currKey]) ? objTwo[currKey] : mergedObject;\n    var putIfNew = !oneHasKey ? objTwo[currKey] : result;\n    return _objectSpread({}, accumulator, _defineProperty({}, currKey, putIfNew));\n  }, {});\n};\n/**\n * Deep merges a list of objects\n */\n\n\nexports.deepMergeTwoObjects = deepMergeTwoObjects;\n\nvar deepMerge = function deepMerge() {\n  for (var _len = arguments.length, objs = new Array(_len), _key = 0; _key < _len; _key++) {\n    objs[_key] = arguments[_key];\n  }\n\n  var firstObject = objs[0];\n  return objs.reduce(function (accumulator, currentVal) {}, _objectSpread({}, firstObject));\n};\n\nexports.deepMerge = deepMerge;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./test/tests.spec.js":
/*!****************************!*\
  !*** ./test/tests.spec.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar deepOperations = _interopRequireWildcard(__webpack_require__(/*! ../src */ \"./src/index.js\"));\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }\n\nvar objectExampleOne = {\n  name: 'Gabriel',\n  lastname: 'Seixas',\n  address: {\n    streetName: 'Master street',\n    number: '355',\n    example: {\n      name: 'name1'\n    }\n  },\n  telephones: ['2256-4329', '99283-7844'],\n  dogs: ['jujuba', 'nina']\n};\nvar objectExampleTwo = {\n  name: 'Raquel',\n  lastname: 'Seixas',\n  address: {\n    streetName: 'Creep street',\n    number: '355',\n    example: {\n      name: 'name2',\n      example: 'exampleKey'\n    }\n  },\n  telephones: ['2256-4329', '99283-7777'],\n  dogs: ['hana', 'bidu', 'nina']\n};\nvar merged = deepOperations.deepMergeTwoObjects(objectExampleOne, objectExampleTwo);\nconsole.log('=============================');\nconsole.log(merged);\nconsole.log('=============================');\nvar diff = deepOperations.objectDiff(objectExampleOne, objectExampleTwo, {\n  shallow: false\n});\nconsole.log('=============================');\nconsole.log(diff);\nconsole.log('=============================');\n\n//# sourceURL=webpack:///./test/tests.spec.js?");

/***/ })

/******/ });