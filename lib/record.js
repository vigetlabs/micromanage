/**
 * Record
 * Generates a record entity that creates, updates, and validates
 * objects based upon a JSON schema.
 */

var jjv = require('jjv')
var merge = require('./merge')
var expand = require('./expand')
var getDefaultValues = require('./getDefaultValues')

var env = jjv()

function Record (options) {
  var schema = expand(options)
  var defaults = getDefaultValues(schema)

  // Add the schema to the environment
  env.addSchema(schema.title, schema)

  function Schema (params) {
    return merge(defaults, params)
  }

  Schema.validate = function (record) {
    var issues = env.validate(schema.title, record)

    return issues ? issues.validation : null
  }

  Schema.update = function (record, params) {
    return Schema(merge(record, params))
  }

  Schema.schema = env.schema[schema.title]

  return Schema
}

Record.env = env

module.exports = Record
