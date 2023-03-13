## Description

Simple webapp for TestToken balance and minting

## Running the app

```bash
# Run with docker compose
docker compose up

```

## Interact with the application

```bash
curl http://localhost:3000/
```

## Explanation

This application was built using nestjs framework, having a mongo DB as the persistent store. Mongo DB was choosen due to the good support it has in nestjs, but any other DB could have been choosen, like for example mysql or postgressql, which the advantage of being able to assess if DB procedures and triggers could improve performance even though it could be more cumbersome.

## Weaknesses

## Improvements

Here are some improvements, mostly due to time management:

- Add more indexes to schemas
- implemented tests
- Comment functions
- Better logs
- Request response could be more customized

## Assumptions
