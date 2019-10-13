FROM alpine:edge

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk update 
RUN apk add --no-cache ca-certificates ffmpeg opus libsodium-dev build-base nodejs youtube-dl
RUN apk add --no-cache --virtual .build-deps gcc git libffi-dev make musl-dev 

RUN npm install

RUN apk del .build-deps

COPY . .

ENTRYPOINT ["start.sh"]