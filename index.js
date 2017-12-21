/*!
 * base-pkg <https://github.com/node-base/base-pkg>
 *
 * Copyright (c) 2016-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

const isValid = require('is-valid-app');
const debug = require('debug')('base-pkg');
const Expand = require('expand-pkg');
const Pkg = require('pkg-store');

module.exports = function(options) {
  if (typeof options === 'string') {
    options = { cwd: options };
  }

  return function(app) {
    if (!isValid(app, 'base-pkg')) return;
    debug('initializing from <%s>', __filename);
    app.pkg = new Pkg(Object.assign({ cwd: process.cwd() }, app.options, options));
    app.pkg.expand = function() {
      const pkg = new Expand();
      return pkg.expand(Object.assign({}, app.pkg.data));
    };
  };
};
