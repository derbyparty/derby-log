var log = require('derby-log');

// winston levels from server
var levels = {LEVELS:LEVELS};

log.log = function(level, message, meta) {
  // send it to the server
  // construct an HTTP request
  var xhr = new XMLHttpRequest();
  xhr.open('post', '/log', true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  var data = {
    level: level,
    message: message,
    meta: meta
  }
  // send the collected data as JSON
  xhr.send(JSON.stringify(data));

  // log it to the browser console
  if (typeof console !== 'undefined') {
    level = (console[level] ? level : 'log');
    console[level](level + ': ' + message);
  }
};

// attach methods for each log level
for (var level in levels) {
  if (levels.hasOwnProperty(level)) {
    (function(level) {
      log[level] = function(message, cb) {
        this.log(level, message, cb);
      };
    })(level);
  }
}

// catch browser unhandled errors
window.onerror = function(msg, url, code) {
  var error = msg + " in " + url + " with code " + code;
  log.error(error);
};