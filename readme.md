# Install requirements:
 - docker (https://docs.docker.com/get-docker/)

# Developing

## Start developing cmd:
`docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build`

## Stop developing cmd:
`docker compose -f docker-compose.yml -f docker-compose.dev.yml down -v`

# testing

## run tests
docker compose -f docker-compose.yml -f docker-compose.test.yml up --attach motorway-takehome-api --abort-on-container-exit --exit-code-from motorway-takehome-api --build


## In case of changing dependncies use:
docker compose -f docker-compose.yml -f docker-compose.test.yml down -v