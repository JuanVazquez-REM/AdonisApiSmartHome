'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DeviceSchema extends Schema {
  up () {
    this.create('devices', (collection) => {
      collection.index('raspberry_id_index_unique', {raspberry_id: 1}, {unique: true})
    })
  }

  down () {
    this.drop('devices')
  }
}

module.exports = DeviceSchema
