var merge = require('../lib/merge')
var assert = require('assert')

describe('merge', function() {

  it ('copies over properties', function() {
    var first = { color: 'red' }
    var next  = merge(first, { color: 'blue' }, { name: 'Gene' })

    assert.equal(next.color, 'blue')
    assert.equal(next.name, 'Gene')
  })

  it ('does not copy over prototype fields', function() {
    function Constructor() {}
    Constructor.prototype.foo = 'bar'

    var first = new Constructor()
    var next  = merge(first, { color: 'blue' })

    assert.fail('foo' in first)
    assert.equal(next.color, 'blue')
  })

  it ('creates a new object', function() {
    var first = { color: 'red' }
    var next  = merge(first, { color: 'blue' })

    assert.notEqual(first, next)
  })

})
