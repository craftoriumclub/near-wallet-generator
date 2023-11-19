FROM node:lts-alpine as build-stage
RUN apk add --no-cache build-base python3
RUN [ -e /usr/bin/python ] || ln -s /usr/bin/python3 /usr/bin/python
ENV PYTHON=/usr/bin/python
RUN npm install -g node-gyp
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY ./ ./
#RUN yarn build:prod
RUN yarn build

FROM nginx:stable-alpine as production-stage
COPY docker/production/nginx/conf.d /etc/nginx/conf.d
WORKDIR /app
COPY --from=build-stage /app/dist ./public
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
