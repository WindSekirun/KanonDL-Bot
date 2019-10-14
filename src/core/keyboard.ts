import TelegramBot = require('node-telegram-bot-api');
import {
    bot
} from './bot';
import * as settings from '../../settings.json';

let callbackQueryListener = null;

export class SendMessageOptions implements TelegramBot.SendMessageOptions {
    reply_to_message_id ? : number
    reply_markup ? : TelegramBot.InlineKeyboardMarkup | TelegramBot.ReplyKeyboardMarkup | TelegramBot.ReplyKeyboardRemove | TelegramBot.ForceReply;
}

export class InlineKeyboardMarkup implements TelegramBot.InlineKeyboardMarkup {
    inline_keyboard: TelegramBot.InlineKeyboardButton[][];
}

export class InlineKeyboardButton implements TelegramBot.InlineKeyboardButton {
    text: string;url ? : string;
    callback_data ? : string;
    switch_inline_query ? : string;
    switch_inline_query_current_chat ? : string;
    callback_game ? : object;
    pay ? : boolean;
}

export class EditMessageReplyMarkupOptions implements TelegramBot.EditMessageReplyMarkupOptions {
    chat_id ? : number | string;
    message_id ? : number;
    inline_message_id ? : string;
}

export function makeButton(text: string, callback_data: string) {
    let button = new InlineKeyboardButton();
    button.text = text
    button.callback_data = callback_data
    return button
}

export function addInlineKeyboard(...buttons: InlineKeyboardButton[]) {
    let markup = new InlineKeyboardMarkup()
    markup.inline_keyboard = [];
    markup.inline_keyboard.push(buttons)
    return markup
}

export function sendKeyboard(chatId: number, message: string, options: TelegramBot.SendMessageOptions, autoRemove: Boolean = false) {
    return new Promise < TelegramBot.CallbackQuery > (async (resolve, reject) => {
        callbackQueryListener = (query: TelegramBot.CallbackQuery) => {
            if (settings.DEBUG_MODE && settings.LOG_MESSAGE_BODY) {
                console.log(query)
            }

            clearTimeout(keyboardTimeout)
        
            bot.removeListener('callback_query', callbackQueryListener)
            resolve(query);

            if (autoRemove) {
                let options = new EditMessageReplyMarkupOptions()
                options.chat_id = chatId
                options.message_id = messageId
                editMessageReplyMarkup(options)
            }
        };

        let messageId: number;

        // prepend once listener to 
        bot.addListener('callback_query', callbackQueryListener)

        // set timeout when user doesn't callback after some time.
        let keyboardTimeout = setTimeout(() => {
            bot.removeListener('callback_query', callbackQueryListener)
            reject(new Error("Timeout."))

            if (autoRemove) {
                let options = new EditMessageReplyMarkupOptions()
                options.chat_id = chatId
                options.message_id = messageId
                editMessageReplyMarkup(options)
            }
        }, settings.KEYBOARD_TIMEOUT)

        let keyboardMessage = await bot.sendMessage(chatId, message, options)
        messageId = keyboardMessage.message_id;
    })
}

export function editMessageReplyMarkup(options: EditMessageReplyMarkupOptions) {
    console.log(options)

    if (options.inline_message_id = '' && (options.chat_id == '' || options.chat_id == 0) && options.message_id == 0) {
        // ignore empty options
        return;
    }

    bot.editMessageReplyMarkup(new InlineKeyboardMarkup(), options)
        .catch((err) => {
            if (settings.DEBUG_MODE && settings.LOG_MESSAGE_BODY) {
                console.log(err.response.body)
            }
        })
}