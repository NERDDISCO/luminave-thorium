# Contributing

If you want to contribute please follow the guide in this file.

<!-- toc -->

- [Contributing](#contributing)
    - [Pull request](#pull-request)
    - [Issues](#issues)
    - [Development](#development)
    - [New release](#new-release)

<!-- tocstop -->

## Pull request

Ensure that the changes are tested and documented.  
DO NOT commit any built versions.  

This project uses commitizen and conventional changelog. Please use either
to ensure that the changes are listed correctly and the commits can be parsed.

Squash before merging and remove the source branch.

## Issues

Please include the browser and operating system.

A snippet of example code helps a lot, a link to the repo with the issue helps even more.
If the issue can be seen live please provide a link.

Include info about your development environment

* Chrome version

## Development

`npm <command>`

* `start`: starts the development server and opens the demo on localhost:8080
* `test`: Trigger the unit tests

## New release

A new release is done automatically by using semantic-release and Travis
