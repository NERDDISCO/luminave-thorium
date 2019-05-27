# luminave-thorium

Create a connection between [luminave](https://github.com/NERDDISCO/luminave) and the [Thorium Simulator](https://thoriumsim.com/) using GraphQL.

[![Build Status](https://travis-ci.org/NERDDISCO/luminave-thorium.svg?branch=master)](https://travis-ci.org/NERDDISCO/luminave-thorium)

## Table of Contents

<!-- toc -->

- [Setup](#setup)
- [Config](#config)
  * [Example .env](#example-env)
- [Use with luminave & Thorium](#use-with-luminave--thorium)
  * [General Workflow](#general-workflow)
  * [GraphQL](#graphql)
- [Troubleshooting](#troubleshooting)
  * [No data received from Thorium](#no-data-received-from-thorium)
  * [One action in Thorium is triggering more than 1 changes in luminave e.g. the same scene multiple times](#one-action-in-thorium-is-triggering-more-than-1-changes-in-luminave-eg-the-same-scene-multiple-times)
- [API Documentation](#api-documentation)
- [Data provided by Thorium](#data-provided-by-thorium)

<!-- tocstop -->

---

## Setup

* Clone [this repository](https://github.com/NERDDISCO/luminave-thorium)
* Install the dev dependencies by executing `npm install` inside the *luminave-thorium* folder

---

## Config

If you want to change the `host` & `port` of *luminave-thorium*, you have to create a `.env` file inside the *luminave-thorium* folder. 

### Example .env

```
HOST=localhost
PORT=4000
```

---

## Use with luminave & Thorium

* Start with `npm start`
* Start [Thorium server](https://github.com/Thorium-Sim/thorium) with `npm start`
* Create a flight in Thorium at http://localhost:3000
* Add the luminave-thorium as a client with the name `ECS` to the created flight

That's it, luminave-thorium is now ready to receive data from Thorium to send it over to [luminave-server](https://github.com/NERDDISCO/luminave-server). 


### General Workflow

* The app tries to find the Thorium Server running in the local network
* When it finds it it tries to setup a connection to it and registers itself as a client called "ECS"
* When this was successful, it subscribes to new messages on the simulator and the lighting changes (thorium-lighting)
* Those updates are send via a mutation to the luminave-server


### GraphQL

* Use the GraphiQL on http://localhost:3001/graphiql to test your queries

--- 

## Troubleshooting

### No data received from Thorium

* Check if the client IP changed, if that happened you have to restart Thorium & luminave-thorium so it registers itself with the new IP of your computer


### One action in Thorium is triggering more than 1 changes in luminave e.g. the same scene multiple times

* Restart thorium-client and refresh Thorium in the browser



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
