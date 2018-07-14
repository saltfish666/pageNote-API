FROM node:9.11.2-alpine
COPY ./lib/ /app/lib/
COPY ./package.json /app/package.json
WORKDIR /app
RUN npm install
EXPOSE 8072
CMD node ./pageNote.js

# docker build -t=note .
# docker run -d --rm --name=pagenote -p=8088:8072 note

# Linux version 4.9.87-linuxkit-aufs (root@95fa5ec30613) (gcc version 6.4.0 (Alpine 6.4.0) )
# node v9.11.2
