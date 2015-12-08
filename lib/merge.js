/**
 * Copy all arguments (expected to be objects) into
 * a new object.
 */

function merge (/* ...objects */) {
  var clone = {}

  for (var i = 0, len = arguments.length; i < len; i++) {
    for (var key in arguments[i]) {
      if (arguments[i][key] !== null) {
        clone[key] = arguments[i][key]
      }
    }
  }

  return clone
}

module.exports = merge
