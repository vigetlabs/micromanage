var Record = require('../lib/record')
var assert = require('assert')

describe('Record', function() {
  var Person = Record({
    title: 'Person',
    properties: {
      name: {
        type: 'string',
        default: 'Phil'
      },
      rank: {
        oneOf: [
          { type: 'string' },
          { type: 'null' }
        ],
        default: null
      },
      age: 'number'
    }
  })

  it ('creates a record according to a schema', function() {
    var person = Person()

    assert.equal(person.name, 'Phil')
  })

  it ('assigns defaults given undefined props', function() {
    var person = Person({
      name: undefined
    })

    assert.equal(person.name, 'Phil')
  })

  it ('respects null default values', function() {
    var person = Person()

    assert.equal(person.rank, null)
  })

  it ('allows null values, if the property type allows it', function() {
    var person = Person({ rank: null })

    assert.equal(person.rank, null)
  })

  it ('does not validate with null values, if the property type is not null', function() {
    var person = Person({ age: null })

    assert.notEqual(Person.validate(person), null)
  })

  it ('manages nested properties', function() {
    var Nested = Record({
      title: 'NestedSchema',
      properties: {
        child: {
          type: 'object',
          properties: {
            param: {
              type: 'boolean',
              default: true
            }
          }
        }
      }
    })

    var nest = Nested({})
    assert.equal(nest.child.param, true)
  })

  it ('can non-destructively update a record', function() {
    var person = Person()
    var another = Person.update(person, { name: 'Bill' })

    assert.equal(another.name, 'Bill')
    assert.equal(person.name, 'Phil')
    assert.notEqual(person, another)
  })

  it ('can be validated', function() {
    var Widget = Record({
      title: 'Widget',
      required: [ 'weight' ],
      properties: {
        weight: 'number'
      }
    })

    var errors = Widget.validate({
      weight: 'Foobar'
    })

    assert('weight' in errors)

    var noErrors = Widget.validate({
      weight: 0
    })

    assert.equal(noErrors, null)
  })

  it ('maintains a reference to the schema environment', function() {
    assert('env' in Record)
    assert('Person' in Record.env.schema)
  })

  it ('record types can access their schemas', function() {
    assert.equal(Person.schema, Record.env.schema.Person)
  })

  it ('provides a proptype validation', function() {
    var result = Person.PropType({ person: { name: 0 }}, 'person', 'Component')

    assert(result.message.match(/Component/))
    assert(result.message.match(/Person/))
  })

  it ('returns null on successful proptype validation', function() {
    var result = Person.PropType({ person: { name: 'Bill' }}, 'person', 'Component')

    assert.equal(result, null)
  })

})
