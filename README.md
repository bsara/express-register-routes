
# express-register-routes [![NPM Package](https://img.shields.io/npm/v/express-register-routes.svg?style=flat-square)][npm]

[![ISC License](https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square)][license]

> A tiny express.js helper that registers all your routes based on file names and folder structure.

TODO



# Install

```shell
$ npm install --save express-register-routes
```



# Usage

#### index.js

```javascript
const express               = require('express');
const expressRegisterRoutes = require('express-register-routes');


const app = express();


// Will register any route/sub-route configured in `routes`
// directory located in the directory of `process.pwd()`.
//
// Also, all routes will be prefixed with '/api'.
//
// Example:
//   For `routes/users.js`, `/api/users` will be registered.
//   For `routes/users/:userId/address`, `/api/users/:userId/address` will be registered.
expressRegisterRoutes(app, '/api');


app.listen(3000, function() {
  console.log('listening on port 3000...');
});
```


#### routes/users.js

```javascript
const router = require('express').Router();

const User = require('../models/user');


router.get('/', function(req, res) {
  res.send(User.list());
})

// Other HTTP method configurations...


// IMPORTANT: `router` is required to be the exported value of the module.
module.exports = router;
```


#### routes/users/:userId/address.js

```javascript
const router = require('express').Router();

const Address = require('../../../models/address');


router.get('/', function(req, res) {
  res.send(Address.getUserAddress(req.params.userId));
})

// Other HTTP method configurations...


// IMPORTANT: `router` is required to be the exported value of the module.
module.exports = router;
```



# License

ISC License (ISC)

Copyright (c) 2016, Brandon D. Sara (https://bsara.github.io/)

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




[license]: https://github.com/bsara/express-register-routes/blob/master/LICENSE "License"
[npm]:     https://www.npmjs.com/package/express-register-routes "NPM Package: express-register-routes"
