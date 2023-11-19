Run project locally: 

> yarn install

> yarn start


Run project production:

> docker-compose up --build -d
> 
> Перед тим в Dockerfile "RUN yarn build:prod-test" замінити на "RUN yarn build:prod"

```
# nginx 
upstream wallet {
  server localhost:8080;
}
...
location /wallet/ {
   proxy_pass http://wallet/;
   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   proxy_set_header Host $host;
   proxy_redirect off;
   proxy_set_header X-Forwarded-Proto $scheme;
}
...
```