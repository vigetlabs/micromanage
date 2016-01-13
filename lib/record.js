/**
 * Record
 * Generates a record entity that creates, updates, and validates
 * objects based upon a JSON schema.
 */

var jjv = require('jjv')
var merge = require('./merge')
var expand = require('./expand')
var getDefaultValues = require('./getDefaultValues')
var validate = require('./validate')
var propType = require('./propType')

var env = jjv()

function Record (options) {
  var schema = expand(options)
  var defaults = getDefaultValues(schema)

  // Add the schema to the environment
  env.addSchema(schema.title, schema)

  var Schema = merge.bind(null, defaults)

  Schema.validate = validate(env, schema.title)
  Schema.PropType = propType(env, schema.title)
  Schema.schema = env.schema[schema.title]
  Schema.isRecord = true

  return Schema
}

Record.env = env

module.exports = Record
