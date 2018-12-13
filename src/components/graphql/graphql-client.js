import { query } from 'graphqurl'

/**
 * The client can be used to interact with the GraphQL API of Thorium.
 * 
 * @module GraphqlClient
 * 
 * @param {string} address - The IP of the Thorium server
 * @param {string} port - The port of the Thorium server
 * @param {string} clientId - The ID of the client that will be used in Thorium to identify this client
 */
export class GraphqlClient {
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
   * @param {Object} queryParams - Parameter for the query
   * 
   * @return {Promise} -
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
   * @param {Object} queryParams - Parameter for the query
   * 
   * @return {Promise} -
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
 * @param {string} address - The IP of the Thorium server
 * @param {string} port - The port of the Thorium server
 * @param {string} clientId - The ID of the client that will be used in Thorium to identify this client
 * 
 * @return {Object} client - The instance of the GraphqlClient
 */
export default function getClient(address, port, clientId) {
  if (client) {
    return client
  }

  client = new GraphqlClient(address, port, clientId)

  return client
}
