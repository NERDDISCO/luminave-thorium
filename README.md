# luminave-thorium
Create a connection between [luminave](https://github.com/NERDDISCO/luminave) and the [Thorium Simulator](https://thoriumsim.com/) using GraphQL.

## Table of Contents

<!-- toc -->

- [luminave-thorium](#luminave-thorium)
    - [Table of Contents](#table-of-contents)
    - [Setup](#setup)
    - [Testing](#testing)
        - [GraphQL](#graphql)
        - [API Documentation](#api-documentation)

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


You can also open a web-client with http://192.168.178.20:3000/client


### GraphQL

* Use the GraphiQL on http://localhost:3001/graphiql to test your queries


---

### API Documentation

Can be found on [API documentation](docs/API.md).
