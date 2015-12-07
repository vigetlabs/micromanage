var getDefaultValues = require('../lib/getDefaultValues')
var assert = require('assert')

describe('getDefaultValues', function() {

  it ('pulls default values out of a schema', function() {
    var defaults = getDefaultValues({
      properties: {
        name: {
          type: 'string',
          default: 'Bill'
        }
      }
    })

    assert.equal(defaults.name, 'Bill')
  })

  it ('does not include properties without defaults', function() {
    var defaults = getDefaultValues({
      properties: {
        name: {
          type: 'string'
        }
      }
    })

    assert.equal('name' in defaults, false)
  })

  it ('handles a missing properties field', function() {
    var defaults = getDefaultValues()

    assert.deepEqual(defaults, {})
  })

})
