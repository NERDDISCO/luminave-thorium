import { EventEmitter } from 'events'
const App = new EventEmitter()
import getClient from './helpers/graphqlClient'
import registerClient from './helpers/registerClient'
import Client from './client.js'
import Lighting from './lighting.js'

export default (address, port, clientId) => {
  console.log("Starting app...")

  // Create the client singleton
  getClient(address, port, clientId)

  // Register this app with Thorium as a client
  registerClient()

  console.log("Registered Client")

  // Grab the client object to instantiate it
  const client = new Client()

  // Grab the lighting object to instantiate it
  // const lighting = require("./lighting")

  App.on("clientChange", clientObj => {
    // Do something with the client when it changes.
    // For example, start or stop performing actions when a simulator is assigned or unassigned

    // Is a simulator attachted to the client?
    if (clientObj.simulator !== null) {
      const lighting = new Lighting(clientObj.simulator.id)
    } else {
      // no lighting information anymore
      console.log('No simulator selected')
    }
  })

  App.on("lightingChange", lightingObj => {
    // Do something with the client when it changes.
    // For example, start or stop performing actions when a simulator is assigned or unassigned

    console.log('-------------------------')
    console.log(lightingObj)
    console.log('-------------------------')

  })
}

export { App }
