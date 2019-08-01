const moment = require('moment');
const _ = require('lodash')
const fs = require('fs');
const word2pdf = require('word2pdf');
const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://testhfsfd-be.haofenshu.com/',
    timeout: 1000,
    headers: {'api-key': 123456},
});

instance.get('health').then(result => {
    console.log(result);
}).catch(err => {
    console.log(err);
})





