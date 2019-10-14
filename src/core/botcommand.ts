import TelegramBot = require("node-telegram-bot-api");
import * as settings from './env'

export abstract class BotCommand {
    abstract matchRegex: RegExp;
    subMatchRegex: RegExp = null;
    
    abstract onMatch(message: TelegramBot.Message, match: RegExpMatchArray): void

    textMatch?(bot: TelegramBot): void {
        let matchListener = (message: TelegramBot.Message, matchArray: RegExpMatchArray) => {
            if (settings.DEBUG_MODE && settings.LOG_MESSAGE_BODY) {
                console.log(message)
            }

            this.onMatch(message, matchArray)
        }

        bot.onText(this.matchRegex, matchListener)

        if (this.subMatchRegex != null) {
            bot.onText(this.subMatchRegex, matchListener)
        }
    }
}