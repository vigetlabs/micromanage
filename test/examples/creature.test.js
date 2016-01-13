var Creature = require('../../examples/creature')
var assert = require('assert')

describe('Creature', function() {

  it ('has a diet', function() {
    var bronto = Creature({ diet: 'herbivore' })

    assert.equal(bronto.diet, 'herbivore')
  })

  it ('diet must be carnivore, omnivore, or herbivore', function() {
    assert.ifError(Creature.validate({ diet: 'carnivore' }))
    assert.ifError(Creature.validate({ diet: 'omnivore' }))
    assert.ifError(Creature.validate({ diet: 'herbivore' }))

    assert(Creature.validate({ diet: 'snacks' }).diet.enum, true)
  })

  it ('has a belly', function() {
    assert.deepEqual(Creature({}).belly, [])
  })

  it ('can only eat other creatures', function() {
    var prey = Creature({})
    var predator = Creature({ belly: [ prey ]})

    assert.ifError(Creature.validate(predator))
    assert('belly' in Creature.validate({ belly: [{ diet: 'fizbuzz' }] }))
  })

})
