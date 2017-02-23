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
      bar();
    });
  `
  const expected = stripIndent`
    foo(function (err) {
      /* istanbul ignore if */if (err) return cb(err);
      bar();
    });
  `
  const transformed = transform(code, transformOpts)

  expect(transformed.code).toBe(expected)
})
