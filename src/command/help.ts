import TelegramBot = require('node-telegram-bot-api');
import { BotCommand } from '../core/botcommand'
import { bot } from '../core/bot';
import * as messages from '../../message.json';

export class Help extends BotCommand {
    matchRegex: RegExp = /\/help/
    
    onMatch(message: TelegramBot.Message, match: RegExpMatchArray): void {
        bot.sendMessage(message.chat.id, messages.help.format(message.chat.username))
    }
}