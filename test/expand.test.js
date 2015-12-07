var expand = require('../lib/expand')
var assert = require('assert')

describe('expand', function() {

  it ('ensures a type', function() {
    var schema = expand({})

    assert.equal(schema.type, 'object')
  })

  it ('expands shorthand properties into full schemas', function() {
    var schema = expand({
      properties: {
        name: 'string'
      }
    })

    assert.equal(schema.properties.name.type, 'string')
  })

})
