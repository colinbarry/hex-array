"use strict";

const hexarray = require('../hex-array')
const assert = require('assert')

/** True if the given Unit8Array buffers are of the same value.
*/
function eq(lhs, rhs) {
  if (lhs.length != rhs.length)
    return false;

  for (var i = 0; i < lhs.length; ++i) {
    if (lhs[i] != rhs[i])
      return false;
  }

  return true;
}

describe("hex-array", function() {
  describe("toString", function() {
    var empty = new Uint8Array(0),
        content = new Uint8Array([0xc9, 0x13, 0x4b, 0xca,
                                  0x6a, 0x49, 0xfc, 0xf8,
                                  0x2d, 0x30, 0x3b, 0x4e,
                                  0xa0, 0x26, 0x3a, 0xd8]);
    it("a zero-length array produces an empty string", function() {
      assert.equal(hexarray.toString(empty), "");
    })
    it("an array is converted to an uppercase string using no groups or columns", function() {
      assert.equal(hexarray.toString(content), "C9134BCA6A49FCF82D303B4EA0263AD8");
    })
    it("can be converted to lowercase", function() {
      assert.equal(hexarray.toString(content, {uppercase: false}), "c9134bca6a49fcf82d303b4ea0263ad8");
    })
    it("can be grouped in bytes", function() {
      assert.equal(hexarray.toString(content, {grouping: 1}), "C9 13 4B CA 6A 49 FC F8 2D 30 3B 4E A0 26 3A D8");
    })
    it("can be grouped in 2-bytes", function() {
      assert.equal( hexarray.toString(content, {grouping: 2}), "C913 4BCA 6A49 FCF8 2D30 3B4E A026 3AD8");
    })
    it("can be grouped in 8-bytes", function() {
      assert.equal(hexarray.toString(content, {grouping: 8}), "C9134BCA6A49FCF8 2D303B4EA0263AD8");
    })
    it("can be ungrouped", function() {
      assert.equal(hexarray.toString(content, {grouping: 0}), "C9134BCA6A49FCF82D303B4EA0263AD8");
    })
    it("can be grouped into rows of 2 columns", function() {
      assert.equal(hexarray.toString(content, {grouping: 2, rowlength: 2}), "C913 4BCA\n6A49 FCF8\n2D30 3B4E\nA026 3AD8");
    })
  });

  describe("fromString", function() {
    it("produces a zero-length array when passed an empty string", function() {
      assert(eq(hexarray.fromString(""), new Uint8Array(0)));
    })
    it("throws an exception when the input string contains nonhex, nonwhitespace characters", function() {
      assert.throws(function() {hexarray.fromString("z")});
    })
    it("converts an uppercase string to an array", function() {
      assert(eq(hexarray.fromString("DEADBEEF"), new Uint8Array([0xde, 0xad, 0xbe, 0xef])));
    })
    it("converts a lowercase string to an array", function() {
      assert(eq(hexarray.fromString("deadbeef"), new Uint8Array([0xde, 0xad, 0xbe, 0xef])));
    })
    it("ignores whitespace", function() {
      assert(eq(hexarray.fromString("   de ad\r\nbe ef  42 "), new Uint8Array([0xde, 0xad, 0xbe, 0xef, 0x42])));
    })
    it("interprets an odd number of hex characters as if preceeded by a 0", function() {
      assert(eq(hexarray.fromString("1234567"), new Uint8Array([0x01, 0x23, 0x45, 0x67])));
      assert(eq(hexarray.fromString("7"), new Uint8Array([0x07])));
    })
  });
});
