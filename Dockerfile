FROM ubuntu

WORKDIR /usr/src/app

## install requirements
RUN rm -rf /var/lib/apt/list/* && apt-get update && apt-get install nodejs npm ffmpeg -y

## copy files
COPY package*.json ./
COPY . .

RUN npm install

RUN ["chmod", "+x", "./start.sh"]
RUN ["sh", "./start.sh", "--disable-auto-start"]

RUN npm run build

ENTRYPOINT ["./start.sh"]