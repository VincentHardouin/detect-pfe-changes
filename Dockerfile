FROM node:14-alpine as base
WORKDIR /src
COPY package*.json /

FROM base as production
ENV NODE_ENV=production
COPY . /src
RUN npm install --quiet
CMD ["npm", "start"]
