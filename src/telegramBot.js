const Promise = require('bluebird');
const TelegramBot = require('node-telegram-bot-api');

// https://github.com/yagop/node-telegram-bot-api/issues/319
Promise.config({
    cancellation: true
});

class TextMatchModel {
    constructor(chatId, msg, matchResult) {
        this.chatId = chatId
        this.msg = msg
        this.matchResult = matchResult
    }
}

class CallbackQueryModel {
    constructor(chatId, data, callbackData) {
        this.chatId = chatId
        this.data = data
        this.callbackData = callbackData
    }
}

const bot = new TelegramBot('730182561:AAGnYRSAir_pSMr0ToV3idHjnDhTHYCshmM', {
    polling: true
});

bot.on('polling_error', (err) => {
    console.log(err);
});

function textMatch(pattern) {
    return new Promise((resolve, reject) => {
        bot.onText(pattern, (msg, match) => {
            console.log(msg)
            resolve(new TextMatchModel(msg.chat.id, msg, match))
        })
    });
};

function callbackQuery() {
    return new Promise((resolve, reject) => {
        bot.on("callback_query", (data) => {
            console.log(data)
            resolve(new CallbackQueryModel(data.from.id, data, data.data))
        });
    })
}

module.exports.textMatch = textMatch
module.exports.callbackQuery = callbackQuery
module.exports.TelegramBot = bot