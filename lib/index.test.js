'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    foo(function (err) {\n      if (err) return cb(err);\n      bar(err);\n    });\n  '], ['\n    foo(function (err) {\n      if (err) return cb(err);\n      bar(err);\n    });\n  ']),
    _templateObject2 = _taggedTemplateLiteral(['\n    foo(function (err) {\n      /* istanbul ignore if */if (err) return cb(err);\n      bar(err);\n    });\n  '], ['\n    foo(function (err) {\n      /* istanbul ignore if */if (err) return cb(err);\n      bar(err);\n    });\n  ']),
    _templateObject3 = _taggedTemplateLiteral(['\n    foo(function (err) {\n      if (err) bar(err);\n    });\n  '], ['\n    foo(function (err) {\n      if (err) bar(err);\n    });\n  ']),
    _templateObject4 = _taggedTemplateLiteral(['\n    foo(function (err) {\n      if (true) return bar(err);\n    });\n  '], ['\n    foo(function (err) {\n      if (true) return bar(err);\n    });\n  ']);

var _babelCore = require('babel-core');

var _commonTags = require('common-tags');

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /* eslint-env jest */


var transformOpts = {
  babelrc: false,
  plugins: [_2.default]
};

test('adds ignore comment for error callback', function () {
  var code = (0, _commonTags.stripIndent)(_templateObject);
  var expected = (0, _commonTags.stripIndent)(_templateObject2);
  expect((0, _babelCore.transform)(code, transformOpts).code).toBe(expected);
});

test('does not transform non-returning error callbacks', function () {
  var code = (0, _commonTags.stripIndent)(_templateObject3);
  var expected = (0, _commonTags.stripIndent)(_templateObject3);
  expect((0, _babelCore.transform)(code, transformOpts).code).toBe(expected);
});

test('does not transform returning callbacks that have an error', function () {
  var code = (0, _commonTags.stripIndent)(_templateObject4);
  var expected = (0, _commonTags.stripIndent)(_templateObject4);
  expect((0, _babelCore.transform)(code, transformOpts).code).toBe(expected);
});