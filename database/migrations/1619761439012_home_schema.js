'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HomeSchema extends Schema {
  up () {
    this.create('homes', (collection) => {
      collection.index('home_id_index_unique', {user_id: 1}, {unique: true})
      collection.index('email_index_unique', {email: 1}, {unique: true})
      collection.index('nombre_index_unique', {nombre: 1}, {unique: true})
    })
  }

  down () {
    this.drop('homes')
  }
}

module.exports = HomeSchema
