import { EventEmitter } from 'events'
const App = new EventEmitter()
import getClient from '../graphql/graphql-client'
import registerClient from '../thorium/thorium-connector'
import ThoriumClient from '../thorium/thorium-client'
import ThoriumLighting from '../thorium/thorium-lighting'

export default (address, port, thoriumClientId) => {
  console.log('Starting app...')

  // Create the client singleton
  getClient(address, port, thoriumClientId)

  // Register this app with Thorium as a client
  registerClient()

  console.log('Registered Client')

  // Grab the client object to instantiate it
  // eslint-disable-next-line no-unused-vars
  const client = new ThoriumClient({ thoriumClientId })

  App.on('clientChange', clientObj => {
    // Is a simulator attachted to the client?
    if (clientObj.simulator === null) {
      // no lighting information anymore
      console.log('No simulator selected')
    } else {
      // eslint-disable-next-line no-unused-vars
      const lighting = new ThoriumLighting({ simulatorId: clientObj.simulator.id })
    }
  })

  App.on('lightingChange', lightingObj => {
    console.log('-------------------------')
    console.log(lightingObj)
    console.log('-------------------------')

  })
}

export { App }
