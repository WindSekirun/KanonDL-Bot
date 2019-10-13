FROM alpine:edge

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk update 
RUN apk add --no-cache ca-certificates ffmpeg opus python3 libsodium-dev build-base nodejs

RUN pip install youtube-dl
RUN npm install

COPY . .

ENTRYPOINT ["start.sh"]