export default function ({types: t}) {
  return {
    visitor: {
      IfStatement (path, state) {
        let {node} = path

        // We're looking for node-style returned error callbacks like:
        //
        //    if (err) return next(err)
        //    if (err) return done(err)
        //    // ... etc.
        //
        var isErrCallback = (
          t.isIdentifier(node.test, {name: 'err'}) &&
          t.isReturnStatement(node.consequent) &&
          t.isCallExpression(node.consequent.argument) &&
          (path.node.consequent.argument.arguments.length === 1) &&
          t.isIdentifier(path.node.consequent.argument.arguments[0], {name: 'err'})
        )

        // Add an istanbul ignore comment like:
        //
        //    /* istanbul ignore if */if(err) return next(err)
        //
        /* istanbul ignore else */
        if (isErrCallback) {
          path.addComment('leading', ' istanbul ignore if ')
        }
      }
    }
  }
}
