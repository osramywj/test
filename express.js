const { reset } = require('chalk');
const express = require('express');
const app = express();

app.use(function (req, res, next) {
    console.log('middleware');
    next();
})

app.get('/test', function (req, res) {
    if(req.params.a === 'b'){
        res.send('hello world')
    }else{
        res.end('fk');
    }
})

app.listen(8080);