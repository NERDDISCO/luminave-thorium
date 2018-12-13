import getThoriumAddress from './components/bonjour/bonjour'
import startApp from './components/app/app'
import { thoriumClientId } from './constants/index'

console.log('Activating bonjour to find the Thorium Server...')

getThoriumAddress()
  .then(({ address, port }) => {
    console.log(`Found Thorium server: ${address}:${port}`)
    startApp(address, port, thoriumClientId)
  })
  .catch(err => {
    console.error('An error occured')
    console.error(err)
  })
