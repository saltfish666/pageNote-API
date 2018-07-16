FROM node:9.11.2-alpine
COPY ./lib/ /app/lib/
COPY ./package.json /app/package.json
COPY ./index.js /app/index.js
WORKDIR /app
RUN npm install
EXPOSE 8072
CMD node ./index.js

# GET image:  docker build -t=note .  or  docker pull saltfish666/pagenote-api
# set mongoURL as shell env youself
# docker run -d --rm --name=pagenote -p=8072:8072 --env=$mongoURL note(or saltfish666/pagenote-api)

# Linux version 4.9.87-linuxkit-aufs (root@95fa5ec30613) (gcc version 6.4.0 (Alpine 6.4.0) )
# node v9.11.2
