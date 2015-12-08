/**
 * Crawl through a schema. Mutative!
 */

function crawl (schema, reducer, state) {
  // No need to crawl a missing schema
  if (!schema || !schema.properties) {
    return state
  }

  Object.keys(schema.properties).forEach(function (key) {
    var value = schema.properties[key]

    if (value && 'properties' in value) {
      state[key] = crawl(value, reducer, {})
    } else {
      reducer(state, value, key)
    }
  })

  return state
}

module.exports = crawl
