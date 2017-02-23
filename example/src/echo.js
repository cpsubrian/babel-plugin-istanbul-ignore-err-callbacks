export default function echo (cb) {
  return function (err, msg) {
    if (err) return cb(err)
    cb(null, msg)
  }
}
