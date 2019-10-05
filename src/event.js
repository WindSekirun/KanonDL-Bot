const EventEmitter = require('events');
const music = require('./music.js')
// const wrapper = require('./youtubedl.js')
class Emitter extends EventEmitter {}

const emitter = new Emitter();

emitter.on('req-dl-audio', (chatid, link) => { 
    console.log(link);
    music.download(chatid, link)
}); 

module.exports = emitter;
