FROM ubuntu

WORKDIR /usr/src/app

## install requirements
RUN rm -rf /var/lib/apt/list/* && apt-get update && apt-get install nodejs npm ffmpeg -y

## copy files
COPY package*.json ./
COPY . .

RUN npm install typescript ts-node node-telegram-bot-api youtube-dl
RUN npm install @types/bluebird @types/node-telegram-bot-api @types/youtube-dl
RUN npm install

RUN ["chmod", "+x", "./start.sh"]
ENTRYPOINT ["./start.sh"]