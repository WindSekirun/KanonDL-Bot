FROM alpine:edge

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk update 
RUN apk add --no-cache ca-certificates ffmpeg opus python3 libsodium-dev build-base nodejs
RUN apk add --no-cache --virtual .build-deps gcc git libffi-dev make musl-dev python3-dev 

RUN pip3 install youtube-dl
RUN npm install

RUN apk del .build-deps

COPY . .

ENTRYPOINT ["start.sh"]