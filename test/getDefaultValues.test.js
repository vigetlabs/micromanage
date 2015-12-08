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

  it ('assigns undefined to keys without defaults', function() {
    var defaults = getDefaultValues({
      properties: {
        name: {
          type: 'string'
        }
      }
    })

    assert.equal(defaults.name, undefined)
  })

  it ('handles a missing properties field', function() {
    var defaults = getDefaultValues()

    assert.deepEqual(defaults, {})
  })

})
