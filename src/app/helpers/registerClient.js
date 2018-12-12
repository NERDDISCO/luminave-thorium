import getClient from './graphqlClient';
const availableCards = ['Test Screen'];

export default function() {
  const client = getClient();

  function deregister() {
    console.log('Shutting down client...');

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
        console.log('Client unregistered.');
        process.exit();
        return 0;
      });
  }

  process.on('SIGINT', deregister);

  return client
    .query({
      query: `
        mutation RegisterClient($client: ID!, $cards: [String]) {
          clientConnect(client: $client, mobile: true, cards: $cards)
        }
      `,
      variables: { client: client.clientId, cards: availableCards }
    })
    .then(() => client);
};
