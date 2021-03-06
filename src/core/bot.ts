import Promise = require('bluebird');
import TelegramBot = require('node-telegram-bot-api');
import * as settings from './env'

// Enable 'cancellation' into Promise
// https://github.com/yagop/node-telegram-bot-api/issues/319
Promise.config({
    cancellation: true
});

export let bot = new TelegramBot(settings.BOT_TOKEN, {filepath: false})

export let sendErrorAdmin = (err: Error) => {
    console.log(err)
    if (settings.ADMIN_USER_ID != "") {
        bot.sendMessage(settings.ADMIN_USER_ID, `이상한 흔적이 발견되었어요. : ${err}`)
    }
}

export function start() {
    if (settings.BOT_TOKEN == "") {
        console.log('Bot token not provided, cannot start KanonBot!')
        return;
    }
    
    console.log('Starting KanonBot...')
    bot.startPolling();
}

// Process with error
bot.on("polling_error", (err) => {
    console.log(err);
})

// commands.ts file is generated for each run. Do not modify it manually.
import * as commands from './commands'
commands.onText(bot)