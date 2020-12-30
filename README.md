# Card Game

A simple game utilizing a [Dice API](http://roll.diceapi.com/) and a [Card API](https://deckofcardsapi.com/).

Game is available as a docker container which can be found in the public docker registy `panbubr/card-game`.

### Test it locally:

- Install [Docker](https://www.docker.com/).
- `docker run -d -p 8888:80 panbubr/card-game:latest`
- Enter `http://localhost:8888` in your browser and test if yourself.

# Development

Application is created in Angular with a help of NX Monorepo Tool. You can develop the changes with

- `npm install`
- `npm run serve card-game`
- Enter `http://localhost:4200` in your browser

# Quality Checks

Every application in NX monorepo has access to the standardized tools for quality checks. All checks are obligatory in the CI/CD pipeline.

- `nx format` - Prettier formatting
- `nx lint` - Lint check
- `nx test` - Unit tests in Jest
- `nx e2e` - E2e tests in Cypress

All checks can be ran with an `afffected` flag which triggers only libraries and apps that are affected by the changes. I.e.:

- `nx affected:test`

# Build

Application comes with the Dockerfile and Nginx configuration for containerization purposes.

- Build an app with `nx build card-game` (or `nx build card-game --prod` for better image optimization)
- Create the Docker Image with `docker build -f ./apps/card-game/Dockerfile .`

# CI/CD pipeline configuration

Application comes with the Github Actions workflow which:

- Sets up environment and cache node_modules for future use
- Runs all the necessary checks: `format, lint, test, e2e`
- Builds an application and the Docker Image
- Deploys the Docker Image to the provided registry
