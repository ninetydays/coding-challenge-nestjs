# Kross Finance Coding challenge

Hi, thanks for applying for the Backend node.js developer position at Kross Finance Korea.
This coding challenge is aiming to evaluate a candidate's problem-solving skills in real-world experiences.
The specific tasks are listed in **the Github issue tracker** and you could submit and merge a PR as you might work with the GitHub issue tracker. The tasks include a bug fix and feature request.

#### Before you start

-   This `README` file has a basic description of the project. Please read it carefully.
-   Look through the tasks and give a quick time estimation for completing the challenge.
-   Submit the PR and merge by yourself for each task. Make sure to specify how much time you spent on the task.
-   use `yarn` over `npm`

## Installation

1. Make sure you have [**node**](https://nodejs.org/), [**yarn**](https://yarnpkg.com/), [**docker**](https://www.docker.com/products/docker-desktop) installed.
2. install dependencies

```
$ yarn install
```

3. running docker container

```
$ docker compose up -d
```

4. running DB migration to check database is available

```
$ NODE_ENV=test yarn migration:run
```

5. running test to check everything is fine

```
$ yarn test
```

## Running test

```
$ yarn test
```

or

```
$ yarn test src/users # to run single directory
```

or

```
$ yarn test src/users/users.service.spec.ts # to run single file
```

## Running locally

```
$ yarn start:dev
```

## DB Migration

make sure to specify `NODE_ENV`. the default is `local`

1. create new migration

```
yarn migration:generate
```

2. run migration

```
yarn migration:run
```

3. rollback migration

```
yarn migration:revert
```
