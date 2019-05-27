import dotenv from 'dotenv'

// Parse the .env file
dotenv.config()

console.log(process.env.NODE_ENV)


const config = {
  env: process.env.NODE_ENV || 'development',

  // Host of the luminave-server
  hostLuminaveServer: process.env.HOST_LUMINAVE_SERVER || 'localhost',
  // Port of the luminave-server
  portLuminaveServer: parseInt(process.env.PORT_LUMINAVE_SERVER) || 4000,

  // Host of Thorium
  // Leave it undefined if you want to have it auto detected with bonjour
  hostThorium: process.env.HOST_THORIUM || undefined,
  // Port of Thorium
  // leave it undefined if you want to have it auto detected with bonjour
  portThorium: parseInt(process.env.PORT_THORIUM) || undefined,

  // ID of the Thorium client that is used by the Thorium Server to
  // identify this client as the one that can control the lighting
  // Note: As of now this will only work if the letters 'ECS' are part of the clientId
  thoriumClientId: process.env.THORIUM_CLIENTID || 'ECS',

  // ID that will be used in luminave to identify the animation that will be used to 
  // dynamically update it's keyframes
  luminiaveAnimationId: process.env.LUMINAVE_ANIMATIONID || 'luminave-thorium-dynamic-animation-1337'
}


// When in debug mode there will be more log messages
config.debugMode = config.env === 'development'

export default config
