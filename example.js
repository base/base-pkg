'use strict';

const pkg = require('./');
const Base = require('base');
const app = new Base();
app.use(pkg());

console.log(app.pkg.get('author'));
console.log(app.pkg.expand());

