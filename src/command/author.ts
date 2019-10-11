import TelegramBot = require('node-telegram-bot-api');
import { BotCommand } from '../core/botcommand'
import { bot } from '../core/bot';
import * as messages from '../../message.json';

export class Author extends BotCommand {
    matchRegex: RegExp = /\/author/
    
    onMatch(message: TelegramBot.Message, match: RegExpMatchArray): void {
        bot.sendMessage(message.chat.id, messages.author)
    }
}