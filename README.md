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

- [Node.js](https://nodejs.org/) 11+
- [Yarn](https://yarnpkg.com/)

### Recommendation

* [nodenv/nodenv](https://github.com/nodenv/nodenv)

### Install

``` console
$ git clone git@github.com:houkiboshi-fabric/schema.git
$ cd schema/
$ nodenv install # <-- optional
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
