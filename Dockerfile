FROM ubuntu

WORKDIR /usr/src/app

COPY package*.json ./

RUN rm -rf /var/lib/apt/list/* && apt-get update && apt-get install nodejs npm ffmpeg -y

RUN npm install

COPY . .

ENTRYPOINT ["./start.sh"]