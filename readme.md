# Install requirements:
 - docker (https://docs.docker.com/get-docker/)

To initialize this project, run `docker compose up` from the root of this project. This will build and seed the database. By default the database runs on port `5432` and is also exposed on `5432`, if you want to change this you can update `docker-compose.yml`.

# Developing

Start developing cmd:
`docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d`

Stop developing cmd:
`docker compose -f docker-compose.yml -f docker-compose.dev.yml down -v`
