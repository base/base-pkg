'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var cwd = require('base-cwd');
var Base = require('base');
var app;

var pkg = require('./');

describe('base-cwd', function() {
  beforeEach(function() {
    app = new Base();
    app.use(cwd());
    app.use(pkg());
  });

  describe('main export', function() {
    it('should export a function', function() {
      assert.equal(typeof pkg, 'function');
    });

    it('should add a `pkg` property to app', function() {
      assert.equal(typeof app.pkg, 'object');
    });

    it('should add an `app.pkg.set` method', function() {
      assert.equal(typeof app.pkg.set, 'function');
    });

    it('should add an `app.pkg.get` method', function() {
      assert.equal(typeof app.pkg.get, 'function');
    });

    it('should add an `app.pkg.has` method', function() {
      assert.equal(typeof app.pkg.has, 'function');
    });

    it('should add an `app.pkg.del` method', function() {
      assert.equal(typeof app.pkg.del, 'function');
    });

    it('should add an `app.pkg.union` method', function() {
      assert.equal(typeof app.pkg.union, 'function');
    });
  });

  describe('get', function() {
    it('should get the name from package.json', function() {
      assert.equal(app.pkg.get('name'), 'base-pkg');
    });
  });

  describe('validation', function() {
    it('should validate with the given function', function() {
      app = new Base();
      app.use(pkg(function(app) {
        return app.isFoo;
      }));
      assert(!app.pkg);
      assert.equal(typeof app.pkg, 'undefined');

      app.isFoo = true;
      app.use(pkg(function(app) {
        return app.isFoo;
      }));

      assert(app.pkg);
      assert.equal(typeof app.pkg, 'object');
    });
  });
});
