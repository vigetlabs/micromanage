var validate = require('./validate')

module.exports = function propType (env, title) {
  var validator = validate(env, title)

  return function (props, propName, componentName) {
    var errors = validator(props[propName])

    if (errors) {
      return new Error(componentName + '.props.' + propName + ' is not a valid ' + title + '. Expected ' + JSON.stringify(errors, null, 0))
    }

    return null
  }
}
