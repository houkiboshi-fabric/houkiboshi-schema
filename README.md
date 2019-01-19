houkiboshi-fabric schema
====

## Overview

## Files

* `docs/*.json`
  * generated schemas
* `docs/ref-parsed/*.json`
  * generated schemas parsed `$ref` pointer

## Updating schemas

### Requirement

- [Node.js](https://nodejs.org/)
  - See [.node-version](./.node-version)
- [Yarn](https://yarnpkg.com/)

## Recommended

- [nodenv/nodenv](https://github.com/nodenv/nodenv)
- [nodenv/node-build](https://github.com/nodenv/node-build)
- [EditorConfig](https://editorconfig.org/)

### Install

``` console
$ git clone git@github.com:houkiboshi-fabric/schema.git
$ cd schema/
$ nodenv update-version-defs && nodenv install # <-- optional
$ yarn install
```

### Usage

Run following to show task list:

``` console
$ yarn run
```

#### Build

build task for production:

``` console
$ yarn run build
```

#### Develop

build & watch task for development:

``` console
$ yarn start
```


## Author

[houkiboshi-fabric](https://github.com/houkiboshi-fabric)
