import TelegramBot = require('node-telegram-bot-api');
import { BotCommand } from '../core/botcommand'
import { bot } from '../core/bot';
import * as YoutubeDLWrapper from '../core/youtubedl'
import * as messages from '../../message.json';
import '../core/ext/string'
import { Media } from '../core/models/media';

export class Info extends BotCommand {
    matchRegex: RegExp = /\/info (.+)/
    
    onMatch(message: TelegramBot.Message, match: RegExpMatchArray): void {
        bot.sendMessage(message.chat.id, messages.notsupportyet)
    }
}