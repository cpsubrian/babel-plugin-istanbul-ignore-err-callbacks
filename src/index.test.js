/* eslint-env jest */
import {transform} from 'babel-core'
import {stripIndent} from 'common-tags'
import plugin from './'

const transformOpts = {
  babelrc: false,
  plugins: [plugin]
}

test('adds ignore comment for error callback', () => {
  const code = stripIndent`
    foo(function (err) {
      if (err) return cb(err);
      bar(err);
    });
  `
  const expected = stripIndent`
    foo(function (err) {
      /* istanbul ignore if */if (err) return cb(err);
      bar(err);
    });
  `
  expect(transform(code, transformOpts).code).toBe(expected)
})

test('does not transform non-returning error callbacks', () => {
  const code = stripIndent`
    foo(function (err) {
      if (err) bar(err);
    });
  `
  const expected = stripIndent`
    foo(function (err) {
      if (err) bar(err);
    });
  `
  expect(transform(code, transformOpts).code).toBe(expected)
})

test('does not transform returning callbacks that have an error', () => {
  const code = stripIndent`
    foo(function (err) {
      if (true) return bar(err);
    });
  `
  const expected = stripIndent`
    foo(function (err) {
      if (true) return bar(err);
    });
  `
  expect(transform(code, transformOpts).code).toBe(expected)
})
