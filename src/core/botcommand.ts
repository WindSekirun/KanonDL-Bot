import TelegramBot = require("node-telegram-bot-api");

export abstract class BotCommand {
    abstract matchRegex: RegExp;
    
    abstract onMatch(message: TelegramBot.Message, match: RegExpMatchArray): void

    textMatch?(bot: TelegramBot): void {
        bot.onText(this.matchRegex, (message: TelegramBot.Message, matchArray: RegExpMatchArray) => {
            this.onMatch(message, matchArray)
        }) 
    }
}