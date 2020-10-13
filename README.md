# Javascript Seminar Frontend

## To run in your local

- Install dependencies `npm i`
- Start the application with `npm run start`

## Swagger document can be found

- at `https://api-globy.herokuapp.com/v1/docs/swagger.json`

# Games

## To run in you local

- Install dependencies `npm i`
- To run frontend: `ng serve --open`. This will use localhost:4200
- To run backend: `npm run start-dev`. This will use localhost:8080

## Adjustments for deployment

- `npm run start` only runs `node server.js`, which serves front- and backend together with the GamesLogic in `gameLogic.js`.

## Hardcoded stuff

- src\app\services\custom\games\games.service.ts contains the url of the backend


## Swagger

- Documents under `swagger\docs\components.yaml`. Endpoints at `http://localhost:8080/games/swagger` or `https://javascript-group-d-frontend.herokuapp.com/games/swagger`