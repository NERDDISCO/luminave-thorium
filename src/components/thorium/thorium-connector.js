import getClient from '../graphql/graphql-client'
import { thoriumAvailableCards } from '../../constants/index'

/**
 * @return {*} - What gets returned here?
 */
export default function() {
  const client = getClient()

  const deregister = () => {
    console.log('Shutting down client...')

    client
      .query({
        query: `
          mutation RemoveClient($id: ID!) {
            clientDisconnect(client: $id)
          }
        `,
        variables: { id: client.clientId }
      })
      .then(() => {
        console.log('Client unregistered.')

        // eslint-disable-next-line no-process-exit
        process.exit()

        return 0
      })
  }

  // Process was stopped in the terminal
  process.on('SIGINT', deregister)

  return client
    .query({
      query: `
        mutation RegisterClient($client: ID!, $cards: [String]) {
          clientConnect(client: $client, mobile: true, cards: $cards)
        }
      `,
      variables: { 
        client: client.clientId, 
        cards: thoriumAvailableCards
      }
    })

    // Find out what gets returned here
    .then(() => client)
}
