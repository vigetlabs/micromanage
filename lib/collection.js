var Record = require('./record')

var Collection = function (options) {
  var Model = options.isRecord ? options : Record(options)
  var identifier = Model.schema.identifier || 'id'

  return {
    add: function (list, params) {
      return list.concat(Model(params))
    },

    find: function (list, id) {
      return list.filter(function (item) {
        return item[identifier] === id
      })[0]
    },

    update: function (list, params) {
      return list.map(function (item) {
        return item[identifier] === params[identifier] ? Model(item, params) : item
      })
    },

    remove: function (list, id) {
      return list.filter(function (item) {
        return item[identifier] !== id
      })
    }
  }
}

module.exports = Collection
