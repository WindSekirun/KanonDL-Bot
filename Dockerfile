FROM ubuntu

WORKDIR /usr/src/app

## install requirements
RUN rm -rf /var/lib/apt/list/* && apt-get update && apt-get install nodejs npm ffmpeg -y

## copy files
COPY . .

RUN ls -la

RUN npm install

RUN ["chmod", "+x", "./start.sh"]
RUN ["sh", "./start.sh", "--disable-auto-start"]

RUN npm run build

RUN ls -la
RUN ls -la built

ENTRYPOINT ["npm", "run", "start-js"]