"use strict";

var lc = ["0", "1", "2", "3", "4", "5", "6", "7",
          "8", "9", "a", "b", "c", "d", "e", "f"];
var uc = ["0", "1", "2", "3", "4", "5", "6", "7",
          "8", "9", "A", "B", "C", "D", "E", "F"];

function toHex(val, uppercase) {
  var set = uppercase ? uc : lc;
  return set[Math.floor(val / 16)] + set[val % 16];
}

function extend(obj, source) {
  for (var key in source) {
    if (obj[key] == undefined)
      obj[key] = source[key];
  }

  return obj;
}

function toString(arr, opts) {
  var defaultOpts = {
    grouping: 0,
    rowlength: 0,
    uppercase: true,
  };

  if (opts == undefined)
    opts = {}

  opts = extend(opts, defaultOpts);

  var str = "";
  var group = 0, column = 0;
  for (var i = 0; i < arr.length; ++i) {
    str += toHex(arr[i], opts.uppercase);

    if (i === arr.length - 1)
      break;

    if (opts.grouping > 0 && ++group === opts.grouping) {
      group = 0;

      if (opts.rowlength > 0 && ++column === opts.rowlength) {
        column = 0;
        str += "\n";
      }
      else
        str += " ";
    }
  }

  return str;
}

function fromString(str) {
  str = str.toLowerCase().replace(/\s/g, "");
  if (str.length % 2 == 1)
    str = "0" + str;

  var len = Math.floor(str.length / 2);
  var buffer = new Uint8Array(len);

  var curr = -1;
  for (var i = 0; i < str.length; ++i) {
    var c = str[i];
    var val = lc.indexOf(c);
    if (val == -1)
        throw Error("unexpected character")

    if (curr === -1) {
      curr = 16 * val;
    } else {
      buffer[Math.floor(i / 2)] = curr + val;
      curr = -1;
    }
  }

  return buffer;
}

exports.toString = toString;
exports.fromString = fromString;
