var through = require('through'),
    winston = require('winston'),
    fileName = '/node_modules/derby-log/lib/client.js';

var log = module.exports = winston;
log.middleware = middleware;
log.plugin = plugin;

// middleware to handle log requests from browser
function middleware(req, res, next) {
  if (req.url === '/log') {
    var level = req.body.level,
        message = req.body.message,
        meta = req.body.meta;

    if (level && message && log[level]) {
      if (meta) {
        log[level](message, meta);
      } else {
        log[level](message);
      }
    }
    res.end();
  } else {
    next();
  }
}

// derbyjs plugin to add client script with levels
function plugin(derby, options) {
  derby.on('store', function(store) {
    store.on('bundle', function(browserify) {
      browserify.add('.' + fileName);
      browserify.transform(addSettingsFromServer)
    });
  });
}

// add winston levels to client script bundle
function addSettingsFromServer(file) {
  if (file.indexOf(fileName) === -1) {
    return through();
  }

  var data = '';
  function write(buf) {
    data += buf;
  }

  function end() {
    data = data.replace('{LEVELS:LEVELS}', JSON.stringify(winston.levels));
    this.queue(data);
    this.queue(null);
  }
  return through(write, end);
}