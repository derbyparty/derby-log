# Derby-log

- Plugin for Derby.js
- Isomorphic logger
- Same logging code for server and browser
- Logs from browser are sent to server by POST-requests
- On server it`s awesome [Winston](https://github.com/flatiron/winston)
- No jQuery dependency
- Influenced by [winston-express](https://github.com/ifit/winston-express)

## Known Issues
- Does not work with [Browserify 2](https://github.com/codeparty/racer/pull/169)
- No support for mulitple loggers
- No support for winston.profile
- Actually only log winston methods are supported

### Installation
```
npm install derby-log
```

### Sample
```
var log = require('derby-log');

log.info('Some info' {myinfo: 123});
log.warn('Warning!');
log.error('Ha ha');
```

### Setting
#### Step 1. Derby Plugin
```
derby.use(log.plugin);
var store = derby.createStore(); //should be below
```
#### Step 2. Connect Middleware
```
  .use(express.bodyParser()) //should be upper
  .use(log.middleware)
```

### It`s just Winston
```
log.add(log.transports.File)
  .remove(log.transports.Console);
```

## The MIT License

Copyright (c) 2013 Vladimir Makhaev

Permission is hereby granted, free of charge, 
to any person obtaining a copy of this software and 
associated documentation files (the "Software"), to 
deal in the Software without restriction, including 
without limitation the rights to use, copy, modify, 
merge, publish, distribute, sublicense, and/or sell 
copies of the Software, and to permit persons to whom 
the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice and this permission notice 
shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR 
ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
