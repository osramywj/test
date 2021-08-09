const {Readable} = require('stream');
const {JSONStream} = require('./writableStream');
const files = ['./1.json', './2.json'];
const readable = new Readable({
    objectMode: true,
});
const writable = new JSONStream();

for(const file of files) {
    readable.push(file);
}
readable.push(null);

readable.pipe(writable)
    .on('finish', () => console.log(writable.result))
    .on('error', err => console.log(err.stack));
