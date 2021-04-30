'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HomeSchema extends Schema {
  up () {
    this.create('homes', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('homes')
  }
}

module.exports = HomeSchema
