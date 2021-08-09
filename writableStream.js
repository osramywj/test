const {Writable} = require('stream');
const fs = require('fs');

// 自定义一个可写流，要实现_write方法
class JSONStream extends Writable {
    constructor(options = {}) {
        options.highWaterMark = 20;
        options.objectMode = true;
        super(options);
        this._result = {};
    }

    get result () {
        return this._result;
    }

    _write(jsonFile, enc, cb) {
        Object.assign(this._result, this.requireJSON(jsonFile));
        cb();
    }

    requireJSON(file) {
        const content = fs.readFileSync(file, {encoding: 'utf8'});   
        const parseContent = JSON.parse(content);
        return parseContent;
    }

}

module.exports = {
    JSONStream
}