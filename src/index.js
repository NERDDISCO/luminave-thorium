import getThoriumAddress from './app/helpers/bonjour'
import startApp from './app'

// Override this with the specific name of the client you want to run.
let clientId = "ECS"
export { clientId }

console.log("Activating bonjour to find the Thorium Server...")

getThoriumAddress()
  .then(({ address, port, name }) => {
    console.log(`Found Thorium server: ${address}:${port}`)
    startApp(address, port, clientId)
  })
  .catch(err => {
    console.error("An error occured")
    console.error(err)
  })
