hex-array
=========

Creates Uint8Array buffers from hexadecimal strings, and vice versa.

## Installation

  npm install hex-array

## Usage
```javascript
  var hexarray = require('hex-array');
  hexarray.toString(new Uint8Array([0xc9, 0x13, 0x4b, 0xca,
                                    0x6a, 0x49, 0xfc, 0xf8,
                                    0x2d, 0x30, 0x3b, 0x4e,
                                    0xa0, 0x26, 0x3a, 0xd8]);
  // = C9134BCA6A49FCF82D303B4EA0263AD8

  hexarray.fromString("C9134BCA6A49FCF82D303B4EA0263AD8");     
  // = Uint8Array [ 201, 19, 75, 202, 106, 73, 252, 248, 45, 48, 59, 78, 160, 38, 58, 216 ]
```

## Methods

## `hexarray.toString(array, [options])`
  converts the given buffer to a string containing its hexadecimal
  representation.

  `array` a Uint8Array buffer to convert.

  `options` an optional object with the following members:

  * `grouping` this number of hex bytes are grouped together with spaces between
  groups. 0 means no grouping is applied. 0 if unspecified.

  * `rowlength` the number of groups which make up a row. When 0, no splitting
  into rows occurs. 0 if unspecified.

  * `uppercase` if true, the output will be in uppercase. true by default.


  `return` a hexadecimal string representing the buffer.


## `hexarray.fromString(string)`
  takes a string containing hexadecimal and returns the equivalent as a
  Uint8Array buffer.

  `string` The string to convert. Whitespace is ignored. If an odd number of
  characters are specified, it will act as if preceeded with a leading 0; that
  is, "FFF" is equivalent to "0FFF".

  `return` a Uint8Array array.


## Tests

  npm test
