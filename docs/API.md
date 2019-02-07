# API documentation


* [GraphqlClient](#module_GraphqlClient)
    * [.getClient](#module_GraphqlClient.getClient) ⇒ <code>Object</code>
    * [.getError](#module_GraphqlClient.getError) ⇒ <code>\*</code>

<a name="module_GraphqlClient"></a>

## GraphqlClient
The client can be used to interact with the GraphQL API of Thorium.


| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | The IP of the Thorium server |
| port | <code>string</code> | The port of the Thorium server |
| clientId | <code>string</code> | The ID of the client that will be used in Thorium to identify this client |

<a name="module_GraphqlClient.getClient"></a>

### GraphqlClient.getClient ⇒ <code>Object</code>
Singleton client

**Returns**: <code>Object</code> - client - The instance of the GraphqlClient  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | What kind of GraphQL client (either thorium or luminave) |
| address | <code>string</code> | The IP of the Thorium server |
| port | <code>string</code> | The port of the Thorium server |
| clientId | <code>string</code> | The ID of the client that will be used in Thorium to identify this client |

<a name="module_GraphqlClient.getError"></a>

### GraphqlClient.getError ⇒ <code>\*</code>
Based on the error gives back only network errors

**Returns**: <code>\*</code> - error  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>\*</code> | The GraphQL error |

<a name="module_ThoriumLighting"></a>

## ThoriumLighting
Get the lighting information out of Thorium for a specific simulator


| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> | The arguments to configure ThoriumLighting |
| args.simulatorId | <code>String</code> | The ID of the simulator that has the lighting information |

<a name="thoriumClientId"></a>

## thoriumClientId
ID of the Thorium client that is used by the Thorium Server to
identify this client as the one that can control the lighting

<a name="thoriumAvailableCards"></a>

## thoriumAvailableCards
The cards that are available for the Thorium client and can be choosen
when using the Thorium Server backend

<a name="getTimelineScenes"></a>

## getTimelineScenes() ⇒ <code>undefined</code>
Get all scenes of the timeline

<a name="updateTimeline"></a>

## updateTimeline(scenes) ⇒ <code>undefined</code>
Update the timeline with the scenes


| Param | Type | Description |
| --- | --- | --- |
| scenes | <code>Array.&lt;Object&gt;</code> | The scenes to update the timeline with |

<a name="transformLightingToScenes"></a>

## transformLightingToScenes(lighting) ⇒ <code>Array.&lt;Object&gt;</code>
Transform the Lighting from Thorium into scenes for luminave

**Returns**: <code>Array.&lt;Object&gt;</code> - A list of scenes  

| Param | Type | Description |
| --- | --- | --- |
| lighting | <code>Object</code> | The lighting data from Thorium |

<a name="createScene"></a>

## createScene(name) ⇒ <code>Object</code>
Create a scene that can be used in luminave

**Returns**: <code>Object</code> - The luminave scene  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the scene |

