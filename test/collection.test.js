var Collection = require('../lib/collection')
var Record = require('../lib/record')
var assert = require('assert')

describe('Collection', function() {

  context ('when a JSON schema is provided', function() {

    beforeEach(function() {
      this.collection = Collection({
        title: 'Company',
        properties: {
          name: {
            type: 'string',
            default: 'ACME'
          },
          age: 'number'
        }
      })
    })

    it ('creates records according to that schema', function() {
      var companies = this.collection.add([], { age: 20 })

      assert.equal(companies[0].name, 'ACME')
      assert.equal(companies[0].age, 20)
    })

    it ('updates records according to that schema', function() {
      var companies = this.collection.add([], { id: 'fiz', age: 20 })
      var updated = this.collection.update(companies, { id: 'fiz', age: 24 })

      assert.equal(updated[0].name, 'ACME')
      assert.equal(updated[0].age, 24)
    })

    it ('finds records based upon a given id', function() {
      var companies = this.collection.add([], { id: 'fiz', age: 20 })
      var phil = this.collection.find(companies, 'fiz')

      assert.equal(phil.name, 'ACME')
    })

    it ('removes records based upon a given id', function() {
      var companies = this.collection.add([], { id: 'fiz', age: 20 })
      var updated = this.collection.remove(companies, 'fiz')

      assert.equal(updated.length, 0)
    })
  })

  context ('when a Record is provided', function() {

    beforeEach(function() {
      this.record = Record({
        title: 'Company',
        properties: {
          name: {
            type: 'string',
            default: 'ACME'
          },
          age: 'number'
        }
      })
      this.collection = Collection(this.record)
    })

    it ('creates records according to that Records schema', function() {
      var companies = this.collection.add([], { age: 20 })

      assert.equal(companies[0].name, 'ACME')
      assert.equal(companies[0].age, 20)
    })
  })
})
