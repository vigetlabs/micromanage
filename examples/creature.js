var Record = require('../index').Record

var Creature = Record({
  title: 'creature',

  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    diet: {
      type: 'string',
      enum: ['carnivore', 'omnivore', 'herbivore'],
      default: 'omnivore'
    },
    vertebrate: {
      type: 'boolean',
      default: true
    },
    belly: {
      type: 'array',
      default: [],
      items: { "$ref": "creature" }
    }
  }
})

module.exports = Creature
