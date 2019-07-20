import { EventEmitter } from 'events'
const App = new EventEmitter()
import { getClient, TYPE_THORIUM, TYPE_LUMINAVE } from '../graphql/graphql-client'
import registerClient from '../thorium/thorium-connector'
import ThoriumClient from '../thorium/thorium-client'
import ThoriumLighting from '../thorium/thorium-lighting'
import LuminaveClient from '../luminave/luminave-client'
import config from '../../config.js'

export default (host, port, thoriumClientId) => {
  console.log('Starting app...')

  const { hostLuminaveServer, portLuminaveServer, debugMode } = config

  // Create the client singleton for Thorium
  getClient(TYPE_THORIUM, host, port, thoriumClientId)

  // Create a client for luminave
  getClient(TYPE_LUMINAVE, hostLuminaveServer, portLuminaveServer, null)

  // Register this app with Thorium as a client
  registerClient()

  console.log('Registered Client')

  // Grab the client object to instantiate it
  // eslint-disable-next-line no-unused-vars
  const thoriumClient = new ThoriumClient({ thoriumClientId })

  // Grab the client object to instantiate it
  // eslint-disable-next-line no-unused-vars
  const luminaveClient = new LuminaveClient({ thoriumClientId })

  App.on('clientChange', clientObj => {
    // Is a simulator attachted to the client?
    if (clientObj.simulator === null) { 
      // no lighting information anymore
      console.log('No simulator selected')
    } else {
      // eslint-disable-next-line no-unused-vars
      const thoriumLighting = new ThoriumLighting({ simulatorId: clientObj.simulator.id })
    }
  })

  App.on('lightingChange', lighting => {

    if (debugMode) {
      console.log('--------------------------')
      console.log('Lighting from Thorium', lighting)
      console.log('update animation')
    }
    
    const animation = luminaveClient.transformLightingToAnimation(lighting)
    luminaveClient.setAnimation(animation)

    if (debugMode) {
      console.log('update scenes')
    }

    const scenes = luminaveClient.transformLightingToScenes(lighting)
    luminaveClient.updateTimeline(scenes)
  })
}

export { App }
