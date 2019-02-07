import { getClient, getError, TYPE_LUMINAVE } from '../graphql/graphql-client'
import gql from 'graphql-tag'

const QUERY = gql`
  query scenes {
    getTimelineScenes {
      name
    }
  }
`

const MUTATION = gql`
  mutation setScenes($scenes: [SceneInput]) {
    setTimelineScenes(scenes: $scenes) {
      name
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
        console.log(scenes)
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
        query: MUTATION,
        variables: { scenes }
      })

      // Extract the scenes from the result
      .then(({ data }) => {
        console.log(data)
      })

      .catch(error => console.error(getError(error)))
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
    const { intensity, action } = lighting
    let { color } = lighting
    const scenes = []

    // Intensity
    if (intensity === 0) {
      scenes.push(this.createScene('intensity-0'))
    } else {
      scenes.push(this.createScene('intensity-1'))
    }

    // Color
    if (color === '#08f') {
      color = 'normal'
    }

    scenes.push(this.createScene(`color-${color}`))

    return scenes
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
