import { query } from 'graphqurl'

/**
 * The client can be used to interact with the GraphQL API of Thorium.
 * 
 * @module GraphQLClient
 * 
 * @param {string} address - The IP of the Thorium server
 * @param {string} port - The port of the Thorium server
 * @param {string} clientId - The ID of the client that will be used in Thorium to identify this client
 */
export class GraphQLClient {
  constructor(address, port, clientId) {
    // Query / Mutation endpoint over HTTP
    this.endpoint = `http://${address}:${parseInt(port, 10) + 1}/graphql`

    // Subscription endpoint over WebSockets
    this.subscriptionEndpoint = `ws://${address}:${parseInt(port, 10) + 2}/subscriptions`

    this.clientId = clientId
  }

  /**
   * Execute a query.
   * 
   * @param {*} queryParams 
   * 
   * @return {Promise}
   */
  query(queryParams) {
    return query({
      ...queryParams,
      endpoint: this.endpoint,
      headers: {
        ...queryParams.headers,
        clientId: this.clientId
      }
    })
  }

  /**
   * Create a subscription.
   * 
   * @param {*} queryParams 
   * 
   * @return {Promise}
   */
  subscribe(queryParams) {
    return query({
      ...queryParams,
      endpoint: this.subscriptionEndpoint,
      headers: {
        ...queryParams.headers,
        clientId: this.clientId
      }
    })
  }
}

let client = null

/**
 * Singleton client
 * 
 * @see GraphQLClient
 */
export default function getClient(address, port, clientId) {
  if (client) return client

  client = new GraphQLClient(address, port, clientId)
  return client
}
