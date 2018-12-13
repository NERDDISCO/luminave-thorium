import getClient from '../graphql/graphql-client'
import { App } from '../app/app'
import gql from 'graphql-tag'

const queryData = `
id
flight {
  id
  name
  date
}
simulator {
  id
  name
}
station {
  name
}
`

const QUERY = gql`
  query Client($clientId: ID!) {
    clients(clientId: $clientId) {
${queryData}
    }
  }
`

const SUBSCRIPTION = gql`
  subscription ClientUpdate($clientId: ID!) {
    clientChanged(client: $clientId) {
${queryData}
    }
  }
`

export default class ThoriumClient {
  constructor(args) {

    this.clientId = args.thoriumClientId

    // Set up a query to get the data that we need
    // We can grab the client without parameters, since
    // the client has already been created by this point
    const graphQLClient = getClient()

    graphQLClient
      .query({ 
        query: QUERY, 
        variables: { clientId: this.clientId } 
      })

      .then(({ data: { clients: [clientObj] } }) => {
        this.flight = clientObj.flight
        this.simulator = clientObj.simulator
        this.station = clientObj.station

        App.emit('clientChange', this)

        // Set up the subscription
        graphQLClient
          .subscribe({
            query: SUBSCRIPTION,
            variables: { clientId: this.clientId }
          })
          .then(observable => {
            observable.subscribe(
              // eslint-disable-next-line no-shadow
              ({ data: { clientChanged: [clientObj] } }) => {
                
                this.flight = clientObj.flight
                this.simulator = clientObj.simulator
                this.station = clientObj.station

                App.emit('clientChange', this)
              },
              error => {
                console.log('Error: ', error)
                // handle error
              }
            )
          })
          .catch(err => console.error(err))
      })
  }
}
