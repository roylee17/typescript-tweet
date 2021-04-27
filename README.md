# Tweet Backend

## Description

Practice TypeScript, GraphQL, TypeORM with Nest.

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.


## Architecture

![Architecture](./doc/images/architecture.svg)

## Design

### Authentication

* The auth module implements JWT authentication.
* We handle the authentication at the "transportation layer", which is decoupled from the GraphQL "APIs".
* The Auth Module supports `Sign Up` and `Sign In` over REST APIs.
* Every time a user signs in, he/she gets the `accessToken` which valid for and hour.
* The user uses the `accessToken` to access the tweet module for both REST endpoints and the GraphQL endpoint.

## Quick Start

Download and install *Docker Desktop*

Start PostgreSQL with `docker-compose`

```shell
docker-compose up -d
```

Setup the database

``` shell
psql -h 127.0.0.1 -U postgres -c 'DROP DATABASE IF EXISTS tweet'

psql -h 127.0.0.1 -U postgres -c 'CREATE DATABASE tweet'
```

Install node and dependencies

```shell
npm install
```

Start the app

```shell
npm run start
```

## Test

We have a few tooling

1. Postman
2. curl
3. GraphQL Playground http://localhost:3000/graphql

I've created a postman collection for both `Auth Module`, and `Tweet Module`
We can use it to test both REST and GraphQL APIs.

The other option is to get the JWT using curl, and test with GraphQL Playground

### Test with Postman

1. Import [Postman collection](tools/Tweet.postman_collection)

![Import Postman collection](./doc/images/import-postman-collection.png)

2. Config environment variable for the `url` `http://localhost:3000`

![Config environment variable for host url](./doc/images/set-the-url-environment-variable.png)

3. Sign up and then sign in. This will get an accessToken from the server, and saved for other APIs.

![Get access token](./doc/images/get-access-token.png)

### Sign up and sign in an user, and save its `accessToken`

Sign up an user.

``` shell
curl -X POST 'http://localhost:3000/auth/signup' \
-H 'Content-Type: application/json' \
-d '{
    "username": "Joesph1@example.org",
    "password": "O1X0l0bEPtXShuT"
}'
```

Sign in as the user

``` shell
curl -X POST 'http://localhost:3000/auth/signin' \
-H 'Content-Type: application/json' \
-d '{
    "username": "Joesph1@example.org",
    "password": "O1X0l0bEPtXShuT"
}'
```

Response:

``` json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvZXNwaDFAZXhhbXBsZS5vcmciLCJpYXQiOjE2MTk1MDIyMTUsImV4cCI6MTYxOTU4ODYxNX0.nsHLRrZlmVtoifNMaBJHm8HKTsMTJJpeN3M46pNi5pM"
}
```

Open the GraphQL Playground, and set the token in the HTTP header

![GraphQL Playground](./doc/images/graphql-playground.png)


## License

Nest is [MIT licensed](LICENSE).
