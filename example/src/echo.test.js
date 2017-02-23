/* eslint-env jest */
import echo from './echo'

test('it should work', function (done) {
  echo(function (err, msg) {
    if (err) return done(err)
    expect(msg).toBe('Hello')
    done()
  })(null, 'Hello')
})
