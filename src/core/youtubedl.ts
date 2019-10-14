import youtubedl = require('youtube-dl');
import * as settings from '../json/settings.json';
import * as messages from '../json/message.json';
import {Media} from './models/media'

const output_path = __dirname + '../../downloads/%(title)s.%(ext)s';
const MOVIE_KR = messages.movie
const AUDIO_KR = messages.audio

export function extractInfo(url: string) {
    return new Promise<Media.Info>((resolve, reject) => {
        // skip download and get informaiton into single-line json
        youtubedl.exec(url, ['-s', '-J', '--socket-timeout', '10'], {}, (err: any, output: string[]) => {
            if (err) {
                if (settings.DEBUG_MODE) {
                    console.log(err)
                }
                reject(err)
                return;
            }

            let message = output.join('\n')
            let info = JSON.parse(message)
            resolve(info)
        })
    });
}

export function downloadVideo(tuple: [string, number, string]) {
    return new Promise<[string, number, string]>((resolve, reject) => {
        let dlTimeout = setTimeout(() => {
            reject(tuple)
        }, settings.KEYBOARD_TIMEOUT)
    
        // Currently, sendVideo api supported <50MB mp4 file. 
        youtubedl.exec(tuple[2], ['-f', '(bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4)[filesize<48M]', '-o', output_path], {}, (err: Error, output: string[]) => {
            clearTimeout(dlTimeout)
            if (err) {
                if (settings.DEBUG_MODE) {
                    console.log(err)
                }
                reject(tuple)
                return;
            }

            // 해당 시점이 들어오는 때는 변환이 완료되었을 때 
            let message = output.join('\n')
            let match = message.match(/\[ffmpeg] Merging formats into (.+)/)

            if (match != undefined) {
                resolve([MOVIE_KR, tuple[1], match[1].replace(/"/gi, '')])
            }
        });
    });
};

export function downloadAudio(tuple: [string, number, string]) {
    return new Promise<[string, number, string]>((resolve, reject) => {
        let dlTimeout = setTimeout(() => {
            reject(tuple)
        }, settings.KEYBOARD_TIMEOUT)

        youtubedl.exec(tuple[2], ['-f', 'bestaudio', '-o', output_path, '-x', '--audio-format', 'mp3'], {}, (err: Error, output: string[]) => {
            clearTimeout(dlTimeout)
            if (err) {
                if (settings.DEBUG_MODE) {
                    console.log(err)
                }
                reject(tuple)
                return;
            }

            // 해당 시점이 들어오는 때는 변환이 완료되었을 때
            let message = output.join('\n')
            let match = message.match(/\[ffmpeg\] Destination\: (.+)/)

            if (match != undefined) {
                resolve([AUDIO_KR, tuple[1], match[1]])
            }
        });
    });
};