import Promise = require('bluebird');
import TelegramBot = require('node-telegram-bot-api');
import * as settings from '../../settings.json';

// Enable 'cancellation' into Promise
// https://github.com/yagop/node-telegram-bot-api/issues/319
Promise.config({
    cancellation: true
});

export let bot = new TelegramBot(settings.BOT_TOKEN)

export let sendErrorAdmin = (err: Error) => {
    console.log(err)
    bot.sendMessage(settings.ADMIN_USER_ID, `이상한 흔적이 발견되었어요. : ${err}`)
}

export function start() {
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