import TelegramBot = require('node-telegram-bot-api');
import { BotCommand } from '../core/botcommand'
import { bot } from '../core/bot';
import * as messages from '../../message.json';
import '../core/string'

export class Start extends BotCommand {
    matchRegex: RegExp = /\/start/
    
    onMatch(message: TelegramBot.Message, match: RegExpMatchArray): void {
        bot.sendMessage(message.chat.id, messages.introduction.format(message.chat.username))
    }
}