// DO NOT MODIFY IT MANUALLY.
// commands.ts file is generated for each run.

import TelegramBot = require('node-telegram-bot-api')
import { Author } from '../command/author';
import { Dl } from '../command/dl';
import { Help } from '../command/help';
import { Issue } from '../command/issue';
import { Start } from '../command/start';

export function onText(bot: TelegramBot) {
    new Author().textMatch(bot);
    new Dl().textMatch(bot);
    new Help().textMatch(bot);
    new Issue().textMatch(bot);
    new Start().textMatch(bot);
}
