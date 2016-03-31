/*!
 * base-pkg <https://github.com/jonschlinkert/base-pkg>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var extend = require('extend-shallow');
var pkgStore = require('pkg-store');

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
        if (pkg) return pkg;
        var cwd = app.cwd || process.cwd();
        var opts = extend({cwd: cwd}, config, app.options);
        return (pkg = pkgStore(opts));
      }
    });

    return plugin;
  };
};
