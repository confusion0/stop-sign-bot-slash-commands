const Keyv = require('keyv')
const { mongooseConnectionStringKeyv } = require('../config.json')

module.exports = {
  name: 'datasetup',
  run: async(client) => {
    client.gData = new Keyv(mongooseConnectionStringKeyv, {namespace: 'guilds'})
    client.uData = new Keyv(mongooseConnectionStringKeyv, {namespace: 'users'})

    client.gData.on('error', err => console.error('Keyv guild data connection error:', err));
    client.uData.on('error', err => console.error('Keyv user data connection error:', err));
  }
}