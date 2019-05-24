import { EventEmitter } from 'events'
const App = new EventEmitter()
import { getClient, TYPE_THORIUM, TYPE_LUMINAVE } from '../graphql/graphql-client'
import registerClient from '../thorium/thorium-connector'
import ThoriumClient from '../thorium/thorium-client'
import ThoriumLighting from '../thorium/thorium-lighting'
import LuminaveClient from '../luminave/luminave-client'

export default (address, port, thoriumClientId) => {
  console.log('Starting app...')

  // Create the client singleton for Thorium
  // @TODO: host & port should be configurable, see https://github.com/NERDDISCO/luminave-thorium/issues/2
  getClient(TYPE_THORIUM, address, parseInt(port, 10) + 1, thoriumClientId)

  // Create a client for luminave
  // @TODO: host & port should be configurable, see https://github.com/NERDDISCO/luminave-thorium/issues/2
  getClient(TYPE_LUMINAVE, 'localhost', 4000, null)

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

  App.on('lightingChange', lightingObj => {
    console.log('--------------------------')
    console.log(lightingObj.lighting)

    console.log('update animation')
    const animation = luminaveClient.transformLightingToAnimation(lightingObj.lighting)
    luminaveClient.setAnimation(animation)

    console.log('update scenes')
    const scenes = luminaveClient.transformLightingToScenes(lightingObj.lighting)
    luminaveClient.updateTimeline(scenes)
    console.log('-------------------------')

  })
}

export { App }
