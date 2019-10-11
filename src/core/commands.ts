// DO NOT MODIFY IT MANUALLY.
// commands.ts file is generated for each run.

import TelegramBot = require('node-telegram-bot-api')
import { Dl } from '../command/dl';
import { Help } from '../command/help';
import { Start } from '../command/start';

export function onText(bot: TelegramBot) {
    new Dl().textMatch(bot);
    new Help().textMatch(bot);
    new Start().textMatch(bot);
}
