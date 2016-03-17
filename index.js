/*!
 * base-pkg <https://github.com/jonschlinkert/base-pkg>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var pkgStore = require('pkg-store');
var namify = require('namify');

module.exports = function(fn) {
  return function plugin(app) {
    if (!isValidInstance(app, fn)) return;
    var self = this;

    this.define('pkg', {
      configurable: true,
      enumerable: true,
      set: function(val) {
        self.define('pkg', val);
      },
      get: function fn() {
        if (fn.pkg) return fn.pkg;
        fn.pkg = pkgStore(this.cwd || process.cwd());

        var name = this.pkg.get('name') || this.project;
        this.project = name;

        this.set('cache.data.name', name);
        this.set('cache.data.varname', namify(name));
        this.set('cache.data.alias', toAlias(self, name));
        return fn.pkg;
      }
    });

    return plugin;
  };
};

function toAlias(app, name) {
  if (typeof app.toAlias === 'function') {
    return app.toAlias(name);
  }
  return name.slice(name.lastIndexOf('-') + 1);
}

function isValidInstance(app, fn) {
  fn = fn || app.options.validatePlugin;
  if (typeof fn === 'function' && !fn(app)) {
    return false;
  }
  if (app.isRegistered('base-pkg')) {
    return false;
  }
  if (app.isCollection || app.isView) {
    return false;
  }
  return true;
}
