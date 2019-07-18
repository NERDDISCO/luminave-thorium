import { query } from 'graphqurl'

export const TYPE_THORIUM = 'thorium-client'
export const TYPE_LUMINAVE = 'luminave-client'

const clients = {
  TYPE_THORIUM: null,
  TYPE_LUMINAVE: null
}

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
    // @TODO: Everything should work over WebSockets, we have to rewrite this into using Apollo-Client
    this.endpoint = `http://${address}:${port}/graphql`
    this.endpointSubscription = `ws://${address}:${port}/graphql`

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
      endpoint: this.endpointSubscription,
      headers: {
        ...queryParams.headers,
        clientId: this.clientId
      }
    })
  }
}

/**
 * Singleton client
 * 
 * @param {string} type - What kind of GraphQL client (either thorium or luminave)
 * @param {string} address - The IP of the Thorium server
 * @param {string} port - The port of the Thorium server
 * @param {string} clientId - The ID of the client that will be used in Thorium to identify this client
 * 
 * @return {Object} client - The instance of the GraphqlClient
 */
export const getClient = (type, address, port, clientId) => {
  if (clients[type]) {
    return clients[type]
  }

  clients[type] = new GraphqlClient(address, port, clientId)

  console.log(type, clients[type].endpoint, clients[type].endpointSubscription)

  return clients[type]
}

/**
 * Based on the error gives back only network errors
 * 
 * @param {*} error The GraphQL error
 * 
 * @returns {*} error
 */
export const getError = error => {
  // If there is a network error we return it
  if (error.networkError !== undefined && error.networkError.result) {
    return error.networkError.result.errors
  } 

  return error
}
