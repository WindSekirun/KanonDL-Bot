const promise = require('./promiseBot.js')
const messageObject = require('../message.json');
const emitter = require('./event.js');

const bot = promise.TelegramBot

promise.textMatch(/\/start/)
    .then((model) => {
        bot.sendMessage(model.chatId, messageObject.introduction)
    });

promise.textMatch(/\/도움말/)
    .then((model) => {
        bot.sendMessage(model.chatId, messageObject.help)
    });

promise.textMatch(/\/제작자/)
    .then((model) => {
        bot.sendMessage(model.chatId, messageObject.author)
    });

promise.textMatch(/\/이슈/)
    .then((model) => {
        bot.sendMessage(model.chatId, messageObject.issue)
    });

promise.textMatch(/\/다운로드 (.+)/)
    .then((model) => {

    })

exports.bot = this.bot