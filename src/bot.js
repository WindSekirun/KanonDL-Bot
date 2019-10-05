const fs = require('fs');
const promise = require('./telegramBot.js')
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

promise.textMatch(/\/help/)
    .then((model) => {
        bot.sendMessage(model.chatId, message.help)
    });

promise.textMatch(/\/author/)
    .then((model) => {
        bot.sendMessage(model.chatId, message.author)
    });

promise.textMatch(/\/issue/)
    .then((model) => {
        bot.sendMessage(model.chatId, message.issue)
    });

promise.textMatch(/\/dl (.+)/)
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
            bot.sendMessage(chatId, message.ackreadyaudio, removeKeyboard);

            let url = callback.replace('1002-', '')
            return wrapper.downloadAudio(chatId, url)
        } else if (callback.includes('1001-')) {
            bot.deleteMessage(chatId, model.data.message.message_id)
            bot.sendMessage(chatId, message.ackreadyvideo, removeKeyboard);

            let url = callback.replace('1001-', '')
            return wrapper.downloadVideo(chatId, url)
        }
    })
    .then((model) => {
        const chatId = model.chatId;
        const type = model.type;
        const path = model.path;

        if (type == 'audio') {
            bot.sendMessage(chatId, message.filereadyaudio)
            return bot.sendAudio(chatId, path)
                .then((data) => fs.unlinkSync(path))
        } else {
            bot.sendMessage(chatId, message.filereadyvideo)
            return bot.sendVideo(chatId, path)
                .then((data) => fs.unlinkSync(path))
        }
    })
    .catch((err) => {
        console.log(err)
        bot.sendMessage('47220554', `Something happen weird... log: ${err}`)
    })


exports.bot = this.bot