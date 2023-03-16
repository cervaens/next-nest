## Description

Simple webapp for TestToken balance and minting

## Running the app

```bash
# Run with docker compose
docker compose up

```

## Interact with the application frontend

```bash
Go to http://localhost:3000/
```

## Interact with the application backend through Swagger UI

```bash
Go to http://localhost:3001/api
```

## Explanation

This application was built using nestjs framework, having a mongo DB as the persistent store.
As agreed with Valentino, my focus would be in the Backend as my React experience is very limited, although I think I managed to fulfill most of the UI steps.

● You will need to create a .env file and fill there the variable needed to execute - Done

● Minting event retrieved and saved into the database - Done;

● Minting event is shown when transaction is confirmed - Done;

● Metamask enforces the use of Göerli blockchain - Done;

● When users sign in using Metamask the user info being shown in the front is saved into the DB and updated if already saved and the token amount changed - Done;

● Create a backend where all the info displayed on the frontend is saved into a DB of your choice and updated when necessary (user sign-ins, minted amount of token, addresses) - Done

● Front-end and back-end communicates through the API - Done, even though the BE is is nestjs

● Print the user history data from database below the Mint Token button, remember to show data only from user that is currently logged - Done

## Weaknesses

- FE is basic, probably not the best code architecture. Also the focus was on showing the required data in the webpage, not any type of styling.
- Nextjs deployment is also basic, just copying all files and build + start

## Improvements

Here are some improvements, mostly due to time management:

- implemented tests
- Comment functions
- Better logs
