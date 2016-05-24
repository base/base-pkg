/*!
 * base-pkg <https://github.com/jonschlinkert/base-pkg>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var util = require('util');
var define = require('define-property');
var isValidInstance = require('is-valid-instance');
var isRegistered = require('is-registered');
var extend = require('extend-shallow');
var pkgStore = require('pkg-store');
var log = require('log-utils');

module.exports = function(config, fn) {
  if (typeof config === 'function') {
    fn = config;
    config = {};
  }

  return function plugin(app) {
    if (!isValid(app)) return;

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

/**
 * Utils
 */

function isValid(app) {
  if (!isValidInstance(app)) {
    return false;
  }
  if (isRegistered(app, 'base-pkg')) {
    return false;
  }
  return true;
}

function decorate(app, pkg) {
  if (pkg.logValue) return;
  define(pkg, 'logValue', function(msg, val) {
    console.log(log.timestamp, msg, util.inspect(val, null, 10));
  });
  define(pkg, 'logInfo', function(msg, val) {
    val = log.colors.cyan(util.inspect(val, null, 10));
    console.log(log.timestamp, msg, val);
  });
  define(pkg, 'logWarning', function(msg, val) {
    val = log.colors.yellow(util.inspect(val, null, 10));
    console.log(log.timestamp, msg, val);
  });
  define(pkg, 'logError', function(msg, val) {
    val = log.colors.red(util.inspect(val, null, 10));
    console.log(log.timestamp, msg, val);
  });
  define(pkg, 'logSuccess', function(msg, val) {
    val = log.colors.green(util.inspect(val, null, 10));
    console.log(log.timestamp, msg, val);
  });
}
