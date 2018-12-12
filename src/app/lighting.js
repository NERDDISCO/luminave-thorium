import getClient from './helpers/graphqlClient';
import { clientId } from '../index';
import gql from 'graphql-tag';
import { App } from './index';

const queryData = `
id
lighting {
  intensity
  action
  actionStrength
  transitionDuration
  useAlertColor
  color
}`;
const QUERY = gql`
query Lighting($id: String!) {
  simulators(id: $id) {
    ${queryData}
  }
}
`;
const SUBSCRIPTION = gql`
        subscription SimulatorsUpdate($id:ID!) {
  simulatorsUpdate(simulatorId:$id) {
    ${queryData}
  }
}
`;

export default class Lighting {
  constructor(id) {
    // Set up a query to get the data that we need
    // We can grab the client without parameters, since
    // the client has already been created by this point
    const graphQLClient = getClient();

    graphQLClient
      .query({ query: QUERY, variables: { id } })
      .then(({ data: { simulators: [simulatorObj] } }) => {

        console.log(simulatorObj)

        this._lighting = simulatorObj.lighting

        // App.emit("lightingChange", this);

        // Set up the subscription
        graphQLClient
          .subscribe({
            query: SUBSCRIPTION,
            variables: { id }
          })
          .then(observable => {
            observable.subscribe(
              ({
                data: {
                  simulatorsUpdate: [simulatorObj]
                }
              }) => {

                console.log(simulatorObj)

                // App.emit("lightingChange", this);
              },
              error => {
                console.log("Error: ", error);
                // handle error
              }
            );
          })
          .catch(err => console.error(err));
      });
  }
}
