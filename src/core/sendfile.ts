import TelegramBot = require('node-telegram-bot-api');
import * as fs from 'fs';
import {
    bot
} from '../core/bot';

export function sendAudio(chatId: number, path: string): Promise<TelegramBot.Message> {
    const stream = fs.createReadStream(path);
    return bot.sendAudio(chatId, stream)
}

export function sendVideo(chatId: number, path: string): Promise<TelegramBot.Message> {
    const stream = fs.createReadStream(path);
    return bot.sendVideo(chatId, stream)
}