var RTCPeerConnection = require('rtc-core/detect')('RTCPeerConnection');
var pc;
var icer = require('..')({ iceServers: fetchIceServers });

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