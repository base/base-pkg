/*!
 * base-pkg <https://github.com/jonschlinkert/base-pkg>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var pkgStore = require('pkg-store');
var namify = require('namify');

module.exports = function(options) {
  return function(app) {
    if (this.isRegistered('base-pkg')) return;

    this.define('pkg', {
      configurable: true,
      enumerable: true,
      set: function(val) {
        app.define('pkg', val);
      },
      get: function fn() {
        if (fn.pkg) return fn.pkg;
        fn.pkg = pkgStore(this.cwd || process.cwd());

        var name = this.pkg.get('name') || this.project;
        this.project = name;

        this.set('cache.data.name', name);
        this.set('cache.data.varname', namify(name));
        this.set('cache.data.alias', name.slice(name.lastIndexOf('-') + 1));
        return fn.pkg;
      }
    });
  };
};

