import { getClient, getError, TYPE_THORIUM } from '../graphql/graphql-client'
import gql from 'graphql-tag'
import { App } from '../app/app'

import config from '../../config.js'

const { debugMode } = config

// The data we received from Thorium via the Subscription
const dataSubscription = {}

const queryData = `
id
lighting {
  intensity
  action
  actionStrength
  transitionDuration
  useAlertColor
  color
}`

const QUERY = gql`
query Lighting($id: ID!) {
  simulators(id: $id) {
    ${queryData}
  }
}
`

const SUBSCRIPTION = gql`
        subscription SimulatorsUpdate($id:ID!) {
  simulatorsUpdate(simulatorId:$id) {
    ${queryData}
  }
}
`

/**
 * Get the lighting information out of Thorium for a specific simulator
 * 
 * @module ThoriumLighting
 * 
 * @param {Object} args - The arguments to configure ThoriumLighting
 * @param {String} args.simulatorId - The ID of the simulator that has the lighting information
 */
export default class ThoriumLighting {
  constructor(args) {

    this.simulatorId = args.simulatorId

    const graphQLClient = getClient(TYPE_THORIUM)

    if (debugMode) {
      console.log('ThoriumLighting', args.simulatorId)
    }

    graphQLClient
      .query({ 
        query: QUERY, 
        variables: { id: this.simulatorId } 
      })
      .then(({ data: { simulators: [simulatorObj] } }) => {

        if (this.dataChanged(this.dataSubscription, simulatorObj.lighting)) {
          App.emit('lightingChange', simulatorObj)
        }

        // Set up the subscription
        graphQLClient
          .subscribe({
            query: SUBSCRIPTION,
            variables: { id: this.simulatorId }
          })
          .then(observable => {
            observable.subscribe(
              // eslint-disable-next-line no-shadow
              ({ data: { simulatorsUpdate: [simulatorObj] } }) => {
                if (this.dataChanged(this.dataSubscription, simulatorObj.lighting)) {
                  App.emit('lightingChange', simulatorObj.lighting)
                }
              },
              error => {
                console.log('Error: ', error)
                // handle error
              }
            )
          })
          .catch(error => console.error(getError(error)))
      })
      .catch(error => console.error(getError(error)))
  }

  /**
   * Check the data that is coming from Thorium to see if it changed
   * 
   * @param {Object} oldValue The old data
   * @param {Object} newValue The new data
   */
  dataChanged(oldValue, newValue) {
    this.dataSubscription = newValue
    
    return JSON.stringify(oldValue) !== JSON.stringify(newValue)
  }
}
