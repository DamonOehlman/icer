# icer

This is a simple convention over configuration approach to setting
`iceServers` for your WebRTC application.  Instead of creating an
`RTCPeerConnection` and simply providing the iceServers into your
peer connection you can use `icer` to help you with the case where your
ice servers details (including credentials) are provided by an external
API endpoint.


[![NPM](https://nodei.co/npm/icer.png)](https://nodei.co/npm/icer/)

[![bitHound Score](https://www.bithound.io/github/DamonOehlman/icer/badges/score.svg)](https://www.bithound.io/github/DamonOehlman/icer) 

## Example Usage

Simply provide either a function or a set of values for the `iceServers`.
When a function is supplied, this function will be called and the actual
values that will be used for ice servers are returned in the error-first
callback.  For example:

__STATIC CONFIGURATION__:

```js
var RTCPeerConnection = require('rtc-core/detect')('RTCPeerConnection');
var pc;

var icer = require('icer')({ iceServers: [
  { urls: 'stun:stun1.l.google.com:19302' },
  { urls: 'stun:stun2.l.google.com:19302' },
  { urls: 'stun:stun3.l.google.com:19302' },
  { urls: 'stun:stun4.l.google.com:19302' }
]});

icer(function(err, iceServers) {
  if (err) {
    return console.error('could not obtain ice server config', err);
  }
  
  pc = new RTCPeerConnection({ iceServers: iceServers });
  console.log('created pc: ', pc);
});
```

__DYNAMIC CONFIGURATION__:

```js
var RTCPeerConnection = require('rtc-core/detect')('RTCPeerConnection');
var pc;
var icer = require('icer')({ iceServers: fetchIceServers });

function fetchIceServers(opts, callback) {
  // make a request to the server that will generate the iceServers
  // we'll just mock that here
  callback(null, []);
}

icer(function(err, iceServers) {
  if (err) {
    return console.error('could not obtain ice server config', err);
  }
  
  pc = new RTCPeerConnection({ iceServers: iceServers });
  console.log('created pc: ', pc);
});
```

## Why?

After reading the examples, you are probably asking yourself why you would
bother using `icer`.  I think that is a reasonable question.  I think the
main reason to consider using `icer` when building your WebRTC enabled
application is that you will have a flexible mechanism for both static
and dynamic iceServers without modifying your code.

## License(s)

### ISC

Copyright (c) 2015, Damon Oehlman <damon.oehlman@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
