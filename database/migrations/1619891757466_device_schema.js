'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DeviceSchema extends Schema {
  up () {
    this.collection('devices', (collection) => {
      collection.index('raspberry_id_index', {raspberry_id: 1})
      collection.index('tipo_index', {tipo: 1})
    })
  }

  down () {
    this.drop('devices')
  }
}

module.exports = DeviceSchema
