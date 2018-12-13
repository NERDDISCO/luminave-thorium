# luminave-thorium

Create a connection between [luminave](https://github.com/NERDDISCO/luminave) and the [Thorium Simulator](https://thoriumsim.com/) using GraphQL.

[![Build Status](https://travis-ci.org/NERDDISCO/luminave-thorium.svg?branch=master)](https://travis-ci.org/NERDDISCO/luminave-thorium)

## Table of Contents

<!-- toc -->

- [Setup](#setup)
- [Testing](#testing)
  * [GraphQL](#graphql)
- [API Documentation](#api-documentation)
- [Data provided by Thorium](#data-provided-by-thorium)

<!-- tocstop -->

---

## Setup

* Clone [this repository](https://github.com/NERDDISCO/luminave-thorium)
* Install the dev dependencies by executing `npm install` inside the repository


## Testing

* Start the Thorium server with `npm start`
* Start luminave-thorium with `npm start`
* Create a flight at http://localhost:3000
* Make sure that luminave-thorium has the word "ECS" in it's clientId (can be changed in the `index.js`)
* Add the luminave-thorium as a client to the created flight
* In the Thorium interface: Go to Core


You can also open a web-client with http://localhost:3000/client


### GraphQL

* Use the GraphiQL on http://localhost:3001/graphiql to test your queries


---

## API Documentation

Can be found on [API documentation](docs/API.md).

--- 

## Data provided by Thorium

[Detailed explanation on how this data could be interpreted.](https://github.com/Thorium-Sim/thorium/issues/1645#issuecomment-445867388)

```graphql
query Simulators($simulatorId: String) {
  simulators(id: $simulatorId) {
    id
    lighting {
      intensity # [0 - 1] How bright the lights should be
      action # One of 'normal', 'fade', 'shake', 'strobe', 'oscillate'
      actionStrength # [0 - 1] How intense the action is. How quickly it shakes, or how fast it strobes or oscillates
      transitionDuration # How long a 'fade' action should last in milliseconds
      color # A suggested color for the lights
    }
  }
}
```
