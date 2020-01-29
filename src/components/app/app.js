import { EventEmitter } from 'events'
const App = new EventEmitter()
import { getClient, TYPE_THORIUM, TYPE_LUMINAVE } from '../graphql/graphql-client'
import registerClient from '../thorium/thorium-connector'
import ThoriumClient from '../thorium/thorium-client'
import ThoriumLighting from '../thorium/thorium-lighting'
import LuminaveClient from '../luminave/luminave-client'
import config from '../../config.js'

export default (protocol, host, port, thoriumClientId) => {
  console.log('Starting app...')

  const { protocolLuminaveServer, hostLuminaveServer, portLuminaveServer, debugMode } = config

  // Create the client singleton for Thorium
  getClient(TYPE_THORIUM, protocol, host, port, thoriumClientId)

  // Create a client for luminave
  getClient(TYPE_LUMINAVE, protocolLuminaveServer, hostLuminaveServer, portLuminaveServer, null)

  // Register this app with Thorium as a client
  registerClient()

  console.log('Registered Client')

  // Grab the client object to instantiate it
  // eslint-disable-next-line no-unused-vars
  const thoriumClient = new ThoriumClient({ thoriumClientId })

  // Handle the lighting from Thorium
  let thoriumLighting = undefined

  // The active simulatorId
  let activeSimulatorId = undefined

  // The active scenes in luminave
  let activeLuminaveScenes = []

  // Grab the client object to instantiate it
  // eslint-disable-next-line no-unused-vars
  const luminaveClient = new LuminaveClient({ thoriumClientId })

  App.on('clientChange', clientObj => {
    // Is a simulator attachted to the client?
    if (clientObj.simulator === null) { 
      // no lighting information anymore
      console.log('No simulator selected')
    } else {

      // Only create a new thorium-lighting if the simulator changed
      if (activeSimulatorId !== clientObj.simulator.id) {
        activeSimulatorId = clientObj.simulator.id

        // Lighting was already created, so we gracefully shut it down
        if (thoriumLighting !== undefined) {
          thoriumLighting.disconnectedCallback()
          thoriumLighting = undefined
        }

        // eslint-disable-next-line no-unused-vars
        thoriumLighting = new ThoriumLighting({ simulatorId: clientObj.simulator.id })
      }

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
    
    // Extracted scenes from Thorium
    let scenes = luminaveClient.transformLightingToScenes(lighting)

    // Remove all scenes that already are active in luminave
    for (let i = 0; i < activeLuminaveScenes.length; i++) {
      scenes = scenes.filter(element => element.name !== activeLuminaveScenes[i].name)
    }

    // Only update the scenes if they changed from the last time
    if (scenes.length > 0) {
      if (debugMode) {
        console.log('update scenes')
      }

      activeLuminaveScenes = scenes
      luminaveClient.updateTimeline(scenes)
    }
  })
}

export { App }
