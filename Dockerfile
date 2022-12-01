FROM node:19 

WORKDIR /app
RUN chown node:node ./
USER node

# override for dev in docker-compose
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

COPY package.json package-lock.json* ./

# npm ci do not install dev dependencies in case of NODE_ENV=production
RUN npm ci && npm cache clean --force

COPY ./motorway-takehome-api ./motorway-takehome-api 

ENV PORT 3000
EXPOSE $PORT
CMD ["node", "./motorway-takehome-api/app.js"]