'use strict'
const store = require('../store')
const federation = require('./federation')
module.exports = {
  resolveObject
}

// find object in local DB or fetch from origin server
async function resolveObject (id, db) {
  let object = await store.object.get(id, db)
  if (object) {
    return object
  }
  object = await federation.requestObject(id)
  await store.object.save(object, db)
  return object
}