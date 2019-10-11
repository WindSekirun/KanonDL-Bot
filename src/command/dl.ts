import TelegramBot = require('node-telegram-bot-api');
import {
    BotCommand
} from '../core/botcommand'
import {
    bot
} from '../core/bot';
import * as messages from '../../message.json';
import * as Keyboard from '../core/keyboard';

const linkPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
const CALLBACK_MOVIE = "movie:deabda26-1ab1-472a-a30e-a926772826e3"
const CALLBACK_MUSIC = "music:c6f74ae2-c050-4f2f-bb64-50069287c85e"


export class Dl extends BotCommand {
    matchRegex: RegExp = /\/dl (.+)/

    onMatch(message: TelegramBot.Message, matchResult: RegExpMatchArray): void {
        let url = matchResult[1];
        let test = linkPattern.test(url);
        let chatId = message.chat.id;

        if (!test) {
            bot.sendMessage(message.chat.id, messages.linkerror);
            return;
        }

        let options = new Keyboard.SendMessageOptions()
        options.reply_to_message_id = message.message_id
        options.reply_markup = Keyboard.addInlineKeyboard(
            Keyboard.makeButton(messages.wantmovie, CALLBACK_MOVIE),
            Keyboard.makeButton(messages.wantmusic, CALLBACK_MUSIC)
        )

        Keyboard.sendKeyboard(message.chat.id, messages.selectdownload, options, true)
            .then((query: TelegramBot.CallbackQuery) => {
                let callbackData = query.data;
                if (callbackData.includes(CALLBACK_MOVIE)) {
                    bot.sendMessage(chatId, messages.ackready.format('영상'));
                } else if (callbackData.includes(CALLBACK_MUSIC)) {
                    bot.sendMessage(chatId, messages.ackready.format('음악'));
                }
            })
            .catch((err: Error) => {
                console.log(err)
                bot.sendMessage(chatId, messages.keyboardtimeout)
            })
    }
}