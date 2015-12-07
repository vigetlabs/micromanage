/**
 * Inflate a set of options into a full schema. This is designed
 * to improve the ergonomics of record creation.
 */

var merge = require('./merge')

function expand (options) {
  var schema = merge({ type: 'object', properties: {} }, options)

  for (var key in schema.properties) {
    if (typeof schema.properties[key] !== 'object') {
      schema.properties[key] = { type: schema.properties[key] }
    }
  }

  return schema
}

module.exports = expand
