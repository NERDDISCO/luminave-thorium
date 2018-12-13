# API documentation

<a name="module_GraphqlClient"></a>

## GraphqlClient
The client can be used to interact with the GraphQL API of Thorium.


| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | The IP of the Thorium server |
| port | <code>string</code> | The port of the Thorium server |
| clientId | <code>string</code> | The ID of the client that will be used in Thorium to identify this client |

<a name="exp_module_GraphqlClient--module.exports"></a>

### module.exports(address, port, clientId) ⇒ <code>Object</code> ⏏
Singleton client

**Returns**: <code>Object</code> - client - The instance of the GraphqlClient  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | The IP of the Thorium server |
| port | <code>string</code> | The port of the Thorium server |
| clientId | <code>string</code> | The ID of the client that will be used in Thorium to identify this client |

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

