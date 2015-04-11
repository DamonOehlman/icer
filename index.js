/**
  # icer
  
  This is a simple convention over configuration approach to setting
  `iceServers` for your WebRTC application.  Instead of creating an
  `RTCPeerConnection` and simply providing the iceServers into your
  peer connection you can use `icer` to help you with the case where your
  ice servers details (including credentials) are provided by an external
  API endpoint.
  
  ## Example Usage
  
  Simply provide either a function or a set of values for the `iceServers`.
  When a function is supplied, this function will be called and the actual
  values that will be used for ice servers are returned in the error-first
  callback.  For example:
  
  __STATIC CONFIGURATION__:
  
  <<< examples/static-config.js
  
  __DYNAMIC CONFIGURATION__:
  
  <<< examples/dynamic-config.js
**/
module.exports = function(opts) {
  // look for iceServers and ice within opts
  var ice = (opts || {}).iceServers;
  
  return function(callback) 
    // if ice is a function then call it with the initially provided opts
    if (typeof ice == 'function') {
      return ice(opts, callback);
    }
    
    return callback(null, ice);
  };
}