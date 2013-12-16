var isServer = process.title !== 'browser';

if (isServer) {
  module.exports = require('./lib/server');
} else {
  module.exports = {};
}
