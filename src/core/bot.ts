import Promise = require('bluebird');
import TelegramBot = require('node-telegram-bot-api');
import * as settings from '../../settings.json';

// Enable 'cancellation' into Promise
// https://github.com/yagop/node-telegram-bot-api/issues/319
Promise.config({
    cancellation: true
});

export let bot = new TelegramBot(settings.BOT_TOKEN, {polling: true})
export let sendErrorAdmin = (err: Error) => {
    console.log(err)
    bot.sendMessage(settings.ADMIN_USER_ID, `이상한 흔적이 발견되었어요. : ${err}`)
}

// Process with error
bot.addListener("polling_error", (err) => {
    console.log(err);
})

bot.onText(/\/start/, (message, match) => {
    let chatId = message.chat.id
    bot.sendMessage(chatId, "안녕하세요!");
})