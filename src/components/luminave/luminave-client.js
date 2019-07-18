import { getClient, getError, TYPE_LUMINAVE } from '../graphql/graphql-client'
import gql from 'graphql-tag'
import { toFixedNumber } from '../../utils/utils.js'
import Color from 'color'
import config from '../../config.js'

const { debugMode, luminaveAnimationId } = config

const QUERY = gql`
  query scenes {
    getTimelineScenes {
      name
    }
  }
`

const MUTATION_SET_TIMELINE_SCENES = gql`
  mutation setScenes($scenes: [SceneInput]) {
    setTimelineScenes(scenes: $scenes) {
      name
    }
  }
`

const MUTATION_SET_ANIMATION = gql`
  mutation setAnimation($animation: AnimationInput) {
    setAnimation(animation: $animation) {
      dimmer
      duration 
      color
      action
      actionStrength
      externalId
    }
  }
`

export default class LuminaveClient {
  constructor() {
    this.graphqlClient = getClient(TYPE_LUMINAVE)

    this.timelineScenes = []
  }

  /**
   * Get all scenes of the timeline
   * 
   * @return {undefined}
   */
  getTimelineScenes() {
    this.graphqlClient
      .query({ query: QUERY })

      // Extract the scenes from the result
      .then(({ data: { getTimelineScenes: scenes } }) => {
        this.timelineScenes = scenes
      })

      .catch(err => console.error(err))
  }

  /**
   * Update the timeline with the scenes
   * 
   * @param {Object[]} scenes - The scenes to update the timeline with
   * 
   * @return {undefined}
   */
  updateTimeline(scenes) {
    this.graphqlClient
      .query({ 
        query: MUTATION_SET_TIMELINE_SCENES,
        variables: { scenes }
      })

      // Extract the scenes from the result
      .then(({ data }) => {
        if (debugMode) {
          console.log('updateTimeline was successful with:', data)
        }
      })

      .catch(error => console.error(getError(error)))
  }

  /**
   * Update animation data
   * 
   * @param {Object[]} animation - The animation data from other applications, for example Thorium
   * 
   * @return {undefined}
   */
  setAnimation(animation) {
    this.graphqlClient
      .query({ 
        query: MUTATION_SET_ANIMATION,
        variables: { animation }
      })

      // Extract the scenes from the result
      .then(({ data }) => {
        if (debugMode) {
          console.log('setAnimation was successful with:', data)
        }
      })

      .catch(error => {
        console.error(getError(error))
      })
  }

  /**
   * 
   * Transform the Lighting from Thorium into scenes for luminave
   * 
   * @param {Object} lighting - The lighting data from Thorium 
   * 
   * @returns {Object[]} A list of scenes
   */
  transformLightingToScenes(lighting) {
    let { color } = lighting
    const scenes = []
    let colorName = `color-normal`;
    // Color
    if (color === "red" || color === "blue") {
      colorName=`color-${color}`;
    }
    scenes.push(this.createScene(colorName))

    return scenes
  }

  /**
   * 
   * Transform the Lighting from Thorium into animation for luminave
   * 
   * @param {Object} lighting - The lighting data from Thorium 
   * 
   * @returns {Object} - An animation
   */
  transformLightingToAnimation(lighting) {
    const { intensity, transitionDuration, color, action, actionStrength } = lighting

    // ID that will be used in luminave to identify the animation that will be used to 
    // dynamically update it's keyframes
    const externalId = luminaveAnimationId

    const animation = {
      dimmer: Math.round(255 * intensity),
      duration: toFixedNumber(transitionDuration, 1),
      color: Color(color).rgb().array(),
      action,
      actionStrength,
      externalId
    }

    return animation
  }

  /**
   * Create a scene that can be used in luminave
   * 
   * @param {String} name - The name of the scene
   * 
   * @return {Object} The luminave scene
   */
  createScene(name) {
    return {
      name
    }
  }
}
