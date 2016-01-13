module.exports = function validate (env, title) {
  return function (record, options) {
    var issues = env.validate(title, record, options)

    return issues ? issues.validation : null
  }
}
