'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var cwd = require('base-cwd');
var Base = require('base');
var app;

var pkg = require('./');
Base.use(function() {
  this.isApp = true;
});

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

    it('should add an `app.pkg.log*` method', function() {
      assert.equal(typeof app.pkg.logValue, 'function');
      assert.equal(typeof app.pkg.logError, 'function');
      assert.equal(typeof app.pkg.logInfo, 'function');
      assert.equal(typeof app.pkg.logSuccess, 'function');
      assert.equal(typeof app.pkg.logWarning, 'function');
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

  describe('logValue', function() {
    it('should log a value', function() {
      assert.equal(app.pkg.logValue('current value is:', {reflinks: ['foo', 'bar']}));
    });
    it('should log an info message', function() {
      assert.equal(app.pkg.logInfo('udpated value:', {reflinks: ['foo', 'bar']}));
    });
    it('should log an warning message', function() {
      assert.equal(app.pkg.logWarning('deleted value:', {reflinks: ['foo', 'bar']}));
    });
    it('should log a success message', function() {
      assert.equal(app.pkg.logSuccess('added value:', {reflinks: ['foo', 'bar']}));
    });
    it('should log an error message', function() {
      assert.equal(app.pkg.logError('missing value:', {reflinks: ['foo', 'bar']}));
    });
  });

  describe('get', function() {
    it('should get the name from package.json', function() {
      assert.equal(app.pkg.get('name'), 'base-pkg');
    });
  });
});
