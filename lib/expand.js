/**
 * Inflate a set of options into a full schema. This is designed
 * to improve the ergonomics of record creation.
 */

var merge = require('./merge')

var isObject = function (value) {
  return !!value && typeof value === 'object'
}

function expand (options) {
  var schema = merge({ type: 'object' }, options)

  if (!schema.properties) {
    return schema
  }

  Object.keys(schema.properties).forEach(function (key) {
    var value = schema.properties[key]
    schema.properties[key] = isObject(value) ? expand(value) : { type: value }
  })

  return schema
}

module.exports = expand
