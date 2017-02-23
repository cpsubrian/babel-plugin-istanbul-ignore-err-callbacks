'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    foo(function (err) {\n      if (err) return cb(err)\n      bar()\n    })\n  '], ['\n    foo(function (err) {\n      if (err) return cb(err)\n      bar()\n    })\n  ']),
    _templateObject2 = _taggedTemplateLiteral(['\n    foo(function (err) {\n      /* istanbul ignore if */if (err) return cb(err)\n      bar()\n    })\n  '], ['\n    foo(function (err) {\n      /* istanbul ignore if */if (err) return cb(err)\n      bar()\n    })\n  ']);

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
  var transformed = (0, _babelCore.transform)(code, transformOpts);

  expect(transformed.code).toBe(expected);
});