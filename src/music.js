const youtubedl = require('youtube-dl');
const emitter = require('./event.js');

download = (chatid, url) => {
    youtubedl.exec(url, ['-f', 'bestaudio', '-o', __dirname + '../../downloads/%(title)s.%(ext)s', '-x', '--audio-format', 'mp3'], {}, function exec(err, output) {
        'use strict';
        if (err) { throw err; }

        // 해당 시점이 들어오는 때는 변환이 완료되었을 때
        let message = output.join('\n')
        let match = message.match(/\[ffmpeg\] Destination\: (.+)/)

        if (match != undefined) {
            console.log(match)
            emitter.emit('send-audio', chatid, match[1])
        }
    });
}

module.exports.download = this.download