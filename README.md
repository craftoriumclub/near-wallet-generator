Run project locally: 

> yarn install

> yarn start


Run project production:

> docker-compose up -d
> 
> Перед тим в Dockerfile "RUN yarn build:prod-test" замінити на "RUN yarn build:prod"