const Promise = require('bluebird');
const TelegramBot = require('node-telegram-bot-api');

// https://github.com/yagop/node-telegram-bot-api/issues/319
Promise.config({
    cancellation: true
});

class TextMatchModel {
    constructor(chatId, msg, match) {
        this.chatId = chatId
        this.msg = msg
        this.match = match
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
            resolve(new TextMatchModel(msg.chat.id, msg, match))
        })
    });
};

module.exports.textMatch = textMatch
module.exports.TelegramBot = bot