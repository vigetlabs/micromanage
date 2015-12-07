/**
 * Given a schema, determine default props
 */

function getDefaultValues (schema) {
  var defaults = {}

  // No need to run defaults on schema properties that don't exist
  if (!schema || !schema.properties) {
    return defaults
  }

  for (var key in schema.properties) {
    if ('default' in schema.properties[key]) {
      defaults[key] = schema.properties[key]['default']
    }
  }

  return defaults
}

module.exports = getDefaultValues
