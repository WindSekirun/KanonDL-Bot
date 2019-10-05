const youtubedl = require('youtube-dl');

class WrapperModel {
    constructor(chatId, type, path){
        this.chatId = chatId
        this.type = type
        this.path = path
    }
}

function downloadAudio(chatId, url) {
    return new Promise((resolve, reject) => {
        youtubedl.exec(url, ['-f', 'bestaudio', '-o', __dirname + '../../downloads/%(title)s.%(ext)s', '-x', '--audio-format', 'mp3'], {}, function exec(err, output) {
            'use strict';
            if (err) { throw err; }
    
            // 해당 시점이 들어오는 때는 변환이 완료되었을 때
            let message = output.join('\n')
            let match = message.match(/\[ffmpeg\] Destination\: (.+)/)
    
            if (match != undefined) {
                resolve(new WrapperModel(chatId, 'audio', match[1]))
            }
        });
    });
};

function downloadVideo(chatId, url) {
    return new Promise((resolve, reject) => {
        youtubedl.exec(url, ['-f', 'bestvideo', '-o', __dirname + '../../downloads/%(title)s.%(ext)s'], {}, function exec(err, output) {
            'use strict';
            if (err) { throw err; }
    
            // 해당 시점이 들어오는 때는 변환이 완료되었을 때
            let message = output.join('\n')
            let match = message.match(/\[ffmpeg\] Destination\: (.+)/)
    
            if (match != undefined) {
                resolve(new WrapperModel(chatId, 'video', match[1]))
            }
        });
    });
};

module.exports.downloadAudio = downloadAudio
module.exports.downloadVideo = downloadVideo