import getThoriumAddress from './components/bonjour/bonjour'
import startApp from './components/app/app'
import config from './config.js'

const { hostThorium, portThorium, thoriumClientId } = config

// Use bonjour to find Thorium
if (hostThorium === undefined && portThorium === undefined) {
  console.log('Activating bonjour to find the Thorium Server...')

  getThoriumAddress()
    .then(({ address, port }) => {
      // GraphQL runs on the port that Thorium runs on + 1
      port = parseInt(port, 10) + 1

      console.log(`Found Thorium server: ${address}:${port}`)
      startApp(address, port, thoriumClientId)
    })
    .catch(err => {
      console.error('An error occured')
      console.error(err)
    })

// Use the configured host & port for Thorium
} else {
  console.log(`Thorium server configured on: ${hostThorium}:${portThorium}`)
  startApp(hostThorium, portThorium, thoriumClientId)
}
