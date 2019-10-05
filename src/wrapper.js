const youtubedl = require('youtube-dl');

class WrapperModel {
    constructor(chatId, type, path) {
        this.chatId = chatId
        this.type = type
        this.path = path
    }
}

const output_path = __dirname + '../../downloads/%(title)s.%(ext)s';

function downloadAudio(chatId, url) {
    return new Promise((resolve, reject) => {
        youtubedl.exec(url, ['-f', 'bestaudio', '-o', output_path, '-x', '--audio-format', 'mp3'], {}, function exec(err, output) {
            'use strict';
            if (err) {
                reject(err)
            } else {
                // 해당 시점이 들어오는 때는 변환이 완료되었을 때
                let message = output.join('\n')
                let match = message.match(/\[ffmpeg\] Destination\: (.+)/)
                console.log(message)

                if (match != undefined) {
                    resolve(new WrapperModel(chatId, 'audio', match[1]))
                }
            }
        });
    });
};

function downloadVideo(chatId, url) {
    return new Promise((resolve, reject) => {
        // Currently, sendVideo api supported <50MB mp4 file. 
        youtubedl.exec(url, ['-f', '(bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4)[filesize<48M]', '-o', output_path], {}, function exec(err, output) {
            'use strict';
            if (err) {
                reject(err)
            } else {
                // 해당 시점이 들어오는 때는 변환이 완료되었을 때
                let message = output.join('\n')
                let match = message.match(/\[ffmpeg] Merging formats into (.+)/)
                console.log(message)

                if (match != undefined) {
                    resolve(new WrapperModel(chatId, 'video', match[1].replace(/"/gi, '')))
                }
            }
        });
    });
};

module.exports.downloadAudio = downloadAudio
module.exports.downloadVideo = downloadVideo