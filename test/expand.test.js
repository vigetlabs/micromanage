var expand = require('../lib/expand')
var assert = require('assert')

describe('expand', function () {

  it ('ensures a type', function() {
    var schema = expand({})

    assert.equal(schema.type, 'object')
  })

  it ('expands shorthand properties into full schemas', function() {
    var schema = expand({
      title: 'Person',

      properties: {
        name: 'string',
        address: {
          default: {
            number : 320,
            street : 'Dream Lane',
            city   : 'Durham'
          },
          properties: {
            number : 'number',
            street : 'string',
            city   : 'string'
          }
        }
      }
    })

    assert.equal(schema.properties.name.type, 'string'),
    assert.equal(schema.properties.address.properties.number.type, 'number')
  })

})
