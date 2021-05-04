'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RaspberrySchema extends Schema {
  up () {
    this.collection('raspberries', (collection) => {
      collection.index('raspberry_id_index_unique', {raspberry_id: 1}, {unique: true})
      collection.index('modelo_index', {modelo: 1})
    })
  }

  down () {
    this.drop('raspberries')
  }
}

module.exports = RaspberrySchema
