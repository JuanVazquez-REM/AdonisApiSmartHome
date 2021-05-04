'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HomeSchema extends Schema {
  up () {
    this.collection('homes', (collection) => {
      collection.index('home_id_index_unique', {home_id: 1})
      collection.index('email_index_unique', {email: 1}, {unique: true})
      collection.index('nombre_unique', {unique: true})
    })
  }

  down () {
    this.drop('homes')
  }
}

module.exports = HomeSchema
