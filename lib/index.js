"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlatObject = function () {
  function FlatObject() {
    _classCallCheck(this, FlatObject);
  }

  _createClass(FlatObject, null, [{
    key: "flatten",
    value: function flatten(data) {
      var result = {};
      var recurse = function recurse(cur, prop) {
        if (Object(cur) !== cur) {
          result[prop] = cur;
        } else if (Array.isArray(cur)) {
          for (var i = 0, l = cur.length; i < l; i++) {
            recurse(cur[i], prop + "[" + i + "]");
          }if (l == 0) result[prop] = [];
        } else {
          var isEmpty = true;
          for (var p in cur) {
            isEmpty = false;
            recurse(cur[p], prop ? prop + "." + p : p);
          }
          if (isEmpty && prop) result[prop] = {};
        }
      };
      recurse(data, "");
      return result;
    }
  }, {
    key: "unflatten",
    value: function unflatten(data) {
      "use strict";

      if (Object(data) !== data || Array.isArray(data)) return data;
      var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
          resultholder = {};
      for (var p in data) {
        var cur = resultholder,
            prop = "",
            m = void 0;
        while (m = regex.exec(p)) {
          cur = cur[prop] || (cur[prop] = m[2] ? [] : {});
          prop = m[2] || m[1];
        }
        cur[prop] = data[p];
      }
      return resultholder[""] || resultholder;
    }
  }]);

  return FlatObject;
}();

exports.default = FlatObject;
