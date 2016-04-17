/*!
 * base-pkg <https://github.com/jonschlinkert/base-pkg>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var util = require('util');
var extend = require('extend-shallow');
var pkgStore = require('pkg-store');
var log = require('log-utils');

module.exports = function(config, fn) {
  if (typeof config === 'function') {
    fn = config;
    config = {};
  }

  return function plugin(app) {
    fn = fn || app.options.validatePlugin;
    if (typeof fn === 'function' && !fn(app)) {
      return;
    }
    if (app.isCollection || app.isView) {
      return;
    }
    if (app.isRegistered('base-pkg')) {
      return;
    }

    var pkg;
    this.define('pkg', {
      configurable: true,
      enumerable: true,
      set: function(val) {
        pkg = val;
      },
      get: function() {
        if (pkg) {
          decorate(app, pkg);
          return pkg;
        }
        var cwd = app.cwd || process.cwd();
        var opts = extend({cwd: cwd}, config, app.options);
        pkg = pkgStore(opts);
        decorate(app, pkg);
        return pkg;
      }
    });

    return plugin;
  };
};

function decorate(app, pkg) {
  if (pkg.logValue) return;
  pkg.logValue = function(msg, val) {
    val = log.colors.cyan(util.inspect(val, null, 10));
    console.log(log.timestamp, msg, val);
  };
}
