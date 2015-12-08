/**
 * Given a schema, determine default props
 */

var crawl = require('./crawl')

function extractDefault (state, field, key) {
  state[key] = field['default']
  return state
}

function getDefaultValues (schema) {
  return crawl(schema, extractDefault, {})
}

module.exports = getDefaultValues
