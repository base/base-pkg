'use strict';

var pkg = require('./');
var cwd = require('base-cwd');
var Base = require('base');
var app = new Base({isApp: true});
app.use(cwd());
app.use(pkg());

var expanded = app.pkg.expand();
console.log(app.pkg.get('author'))
console.log(expanded.get('author'))

