"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aliasArray = exports.aliasObject = void 0;
var getAliasArray = function (aliases) {
  var aliasArray = [];
  for (var _i = 0, _a = Object.entries(aliases); _i < _a.length; _i++) {
    var _b = _a[_i],
      aliasName = _b[0],
      path = _b[1];
    aliasArray.push([aliasName, ".".concat(path)]);
  }
  return aliasArray;
};
// Define aliases for various paths
var aliasObject = {
  "@": "/src",
  "@images": "/src/assets/images",
  "@fonts": "/src/assets/fonts",
};
exports.aliasObject = aliasObject;
var aliasArray = getAliasArray(aliasObject);
exports.aliasArray = aliasArray;
