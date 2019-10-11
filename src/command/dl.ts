import fs = require('fs');
import TelegramBot = require('node-telegram-bot-api');
import {
    BotCommand
} from '../core/botcommand'
import {
    bot, sendErrorAdmin
} from '../core/bot';
import * as messages from '../../message.json';
import * as Keyboard from '../core/keyboard';
import * as YoutubeDLWrapper from '../core/youtubedl'

const LINK_PATTERN = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
const CALLBACK_MOVIE = "movie:deabda26-1ab1-472a-a30e-a926772826e3"
const CALLBACK_MUSIC = "music:c6f74ae2-c050-4f2f-bb64-50069287c85e"
const MOVIE_KR = messages.movie
const AUDIO_KR = messages.audio

export class Dl extends BotCommand {
    matchRegex: RegExp = /\/dl (.+)/

    onMatch(message: TelegramBot.Message, matchResult: RegExpMatchArray): void {
        let url = matchResult[1];
        let test = LINK_PATTERN.test(url);
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
                    bot.sendMessage(chatId, messages.ackready.format(MOVIE_KR));
                    return [MOVIE_KR, chatId, url];
                } else if (callbackData.includes(CALLBACK_MUSIC)) {
                    bot.sendMessage(chatId, messages.ackready.format(AUDIO_KR));
                    return [AUDIO_KR, chatId, url]
                }
            })
            .catch((err: Error) => {
                // 타임아웃을 처리해야 될 때 
                console.log(err)
                bot.sendMessage(chatId, messages.keyboardtimeout)
            })
            .then((tuple: [string, number, string]) => {
                if (tuple[0] == MOVIE_KR) {
                    return YoutubeDLWrapper.downloadVideo(tuple)
                } else if (tuple[0] == AUDIO_KR) {
                    return YoutubeDLWrapper.downloadAudio(tuple)
                }
            })
            .catch((tuple: [string, number, string]) => {
                // TODO: 추출에 실패했을 때 (니코니코 등)
                bot.sendMessage(tuple[1], messages.usecompatmode)
                if (tuple[0] == MOVIE_KR) {

                } else if (tuple[0] == AUDIO_KR) {
                    
                }
            })
            .then(async (tuple: [string, number, string]) => {
                if (tuple[0] == MOVIE_KR) {
                    bot.sendMessage(tuple[1], messages.fileready.format(MOVIE_KR))
                    const data = await bot.sendVideo(chatId, tuple[2]);
                    return fs.unlinkSync(tuple[2]);
                } else if (tuple[0] == AUDIO_KR) {
                    bot.sendMessage(tuple[1], messages.fileready.format(AUDIO_KR))
                    const data = await bot.sendAudio(chatId, tuple[2]);
                    return fs.unlinkSync(tuple[2]);
                }
            })
            .catch(sendErrorAdmin)
    }
}