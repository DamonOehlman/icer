var RTCPeerConnection = require('rtc-core/detect')('RTCPeerConnection');
var pc;

var icer = require('..')({ iceServers: [
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