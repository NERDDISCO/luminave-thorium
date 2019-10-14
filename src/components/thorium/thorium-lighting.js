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
    this.observable = undefined
    this.graphQLClient = getClient(TYPE_THORIUM)

    if (debugMode) {
      console.log('ThoriumLighting for simulatorId', args.simulatorId)
    }

    // Get initial data
    this.graphQLClient
      .query({ 
        query: QUERY, 
        variables: { id: this.simulatorId } 
      })
      .then(({ data: { simulators: [simulatorObj] } }) => {

        if (this.dataChanged(this.dataSubscription, simulatorObj.lighting)) {
          App.emit('lightingChange', simulatorObj.lighting)
        }

        // Get more data when it changes
        this.subsciption()
      })
      .catch(error => console.error(getError(error)))

  }

  /**
   * Subscribe to lighting changes 
   */
  subsciption() {
    this.graphQLClient
      .subscribe({
        query: SUBSCRIPTION,
        variables: { id: this.simulatorId }
      })
      .then(observable => {

        this.observable = observable.subscribe(
          // eslint-disable-next-line no-shadow
          ({ data: { simulatorsUpdate: [simulatorObj] } }) => {

            if (this.dataChanged(this.dataSubscription, simulatorObj.lighting)) {
              App.emit('lightingChange', simulatorObj.lighting)
            }
          },
          error => {
            console.log('Error: ', error)
          }
        )
        
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

    if (debugMode && JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
      console.log('---------------------data Changed-----------------------')
      console.log(JSON.stringify(oldValue))
      console.log(JSON.stringify(newValue))
      console.log('--------------------------------------------------------')
    }
    
    return JSON.stringify(oldValue) !== JSON.stringify(newValue)
  }

  /**
   * Clean up when the component gets destroyed
   */
  disconnectedCallback() {
    // Unsubscribe from subscription
    if (this.observable !== undefined) {
      this.observable.unsubscribe()
    }
  }
}
