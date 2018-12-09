import { query } from 'graphqurl';

// Simple client singleton

class GraphQLClient {
  constructor(address, port, clientId) {
    this.endpoint = `http://${address}:${parseInt(port, 10) + 1}/graphql`;
    this.subscriptionEndpoint = `ws://${address}:${parseInt(port, 10) +
      2}/subscriptions`;
    this.clientId = clientId;
  }
  query(queryParams) {
    return query({
      ...queryParams,
      endpoint: this.endpoint,
      headers: {
        ...queryParams.headers,
        clientId: this.clientId
      }
    });
  }
  subscribe(queryParams) {
    return query({
      ...queryParams,
      endpoint: this.subscriptionEndpoint,
      headers: {
        ...queryParams.headers,
        clientId: this.clientId
      }
    });
  }
}

let client = null;

export default function getClient(address, port, clientId) {
  if (client) return client;

  client = new GraphQLClient(address, port, clientId);
  return client;
};

/*
Usage
client.query({
  query: "subscription { table { column } }",
})
  .then(observable => {
    observable.subscribe(
      event => {
        console.log("Event received: ", event);
        // handle event
      },
      error => {
        console.log("Error: ", error);
        // handle error
      }
    );
  })
  .catch(error => console.error(error));
*/
