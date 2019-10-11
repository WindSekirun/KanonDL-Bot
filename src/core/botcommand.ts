import TelegramBot = require("node-telegram-bot-api");
import * as settings from '../../settings.json';

export abstract class BotCommand {
    abstract matchRegex: RegExp;
    
    abstract onMatch(message: TelegramBot.Message, match: RegExpMatchArray): void

    textMatch?(bot: TelegramBot): void {
        bot.onText(this.matchRegex, (message: TelegramBot.Message, matchArray: RegExpMatchArray) => {
            if (settings.DEBUG_MODE && settings.LOG_MESSAGE_BODY) {
                console.log(message)
            }

            this.onMatch(message, matchArray)
        }) 
    }
}