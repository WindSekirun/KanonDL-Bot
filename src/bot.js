const promise = require('./promiseBot.js')
const wrapper = require('./wrapper.js');
const message = require('../message.json');

const bot = promise.TelegramBot
const linkPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/

const removeKeyboard = {
    reply_markup: {
        remove_keyboard: true
    }
};

promise.textMatch(/\/start/)
    .then((model) => {
        bot.sendMessage(model.chatId, message.introduction)
    });

promise.textMatch(/\/도움말/)
    .then((model) => {
        bot.sendMessage(model.chatId, message.help)
    });

promise.textMatch(/\/제작자/)
    .then((model) => {
        bot.sendMessage(model.chatId, message.author)
    });

promise.textMatch(/\/이슈/)
    .then((model) => {
        bot.sendMessage(model.chatId, message.issue)
    });

// /다운로드 https://www.youtube.com/watch?v=OPMZTg1k8r0
promise.textMatch(/\/다운로드 (.+)/)
    .then((model) => {
        let url = model.matchResult[1]
        let test = linkPattern.test(url)
        if (test) {
            const opts = {
                "reply_to_message_id": model.msg.message_id,
                "reply_markup": {
                    "inline_keyboard": [
                        [
                            {
                                text: message.wantmovie,
                                callback_data: '1001-' + url,
                            },
                            {
                                text: message.wantmusic,
                                callback_data: '1002-' + url,
                            },
                        ],
                    ],
                }
            }

            bot.sendMessage(model.chatId, message.selectdownload, opts);
        } else {
            bot.sendMessage(model.chatId, message.linkerror);
        }
    });

promise.callbackQuery()
    .then((model) => {
        const callback = model.callbackData;
        const chatId = model.chatId;

        if (callback.includes('1002-')) {
            bot.deleteMessage(chatId, model.data.message.message_id)
            bot.sendMessage(chatId, message.ackready, removeKeyboard);

            let url = callback.replace('1002-', '')
            return wrapper.downloadAudio(url)
        } else if (callback.includes('1001-')) {
            bot.deleteMessage(chatId, model.data.message.message_id)
            bot.sendMessage(chatId, message.ackready, removeKeyboard);

            let url = callback.replace('1001-', '')
            return wrapper.downloadVideo(url)
        }
    })
    .then((model) => {
        const type = model.type;
        const path = model.path;

        if (type == 'audio') {
            bot.sendAudio()
        } else {
            
        }
    });


exports.bot = this.bot