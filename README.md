# Micromanage

*This is a proof of concept*

A utility for generating object factories validated by JSON schemas.

Micromanage uses [`jjv`](https://www.npmjs.com/package/jjv) to parse
JSON Schemas.

## Why

Vanilla JavaScript objects are easy to work with. They behave as
expected; they contain no implicit API. They can pass freely through
most code without interoperability hiccups.

However it can be hard to determine their shape, set default values,
and validate them.

This library provides a thin layer over the JSON Schema Draft 4
specification to make it easier to manipulate, reason about, and
validate client-side data.

Specifically, it aims to provide an answer for:

1. Data validation
2. Structural consistency
3. Test scaffolding (randomly generate content based on a schema)

## Usage

```javascript
var Record = require('micromanage').Record

var Cat = Record({
    title: 'Cat',
    properties: {
        species: {
            type: 'string',
            default: 'feline'
        },
        name: {
            type: 'string'
        }
    },
    required: [ 'name' ]
})

// Created an object based on the Cat schema.
var kitten = Cat({ name: 'Felix' }) // => { name: 'felix', species: 'feline' }

// Update a record. This is non-destructive. Returns a new Cat object
var copyCat = Cat.update(kitten, { name: 'Carl' }) // => { name: 'Carl', species: 'feline'}

// Validate a record
var isValid = Cat.validate({}) // { errors: { name: 'required' } }
```

## Reference

- [Understanding JSON schema](http://spacetelescope.github.io/understanding-json-schema/index.html)
- [Property-based Testing of JSON based Web Services](http://www.prowessproject.eu/wp-content/uploads/2012/10/icws2014.pdf)
