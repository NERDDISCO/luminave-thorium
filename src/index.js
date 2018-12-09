// Load up the Bonjour client
import getThoriumAddress from './helpers/bonjour'

import { getClient } from './helpers/graphqlClient'
import registerClient from './helpers/registerClient'
import startApp from './app'

// Override this with the specific name of the client you want to run.
let clientId = "ECS"
export { clientId }

console.log("Activating bonjour browser...")
getThoriumAddress()
  .then(({ address, port, name }) => {
    console.log("Found Thorium server:")
    console.log(`Address: ${address}:${port}`)

    startApp(address, port, clientId)
  })
  .catch(err => {
    console.error("An error occured")
    console.error(err)
  })
