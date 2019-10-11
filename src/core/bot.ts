import Promise = require('bluebird');
import TelegramBot = require('node-telegram-bot-api');


// https://github.com/yagop/node-telegram-bot-api/issues/319
Promise.config({
    cancellation: true
});