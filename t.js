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


// const res = config.get('app');
// const {MongoClient, Db, ObjectId} = require('mongodb');

// async function init(){
//    return await MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true});
// }

// (async function exe(){
//     const mongo = await init();
//     const db = mongo.db('local');
//     const doc = await db.collection('@Message').updateMany({send_to: '杨文举'}, {$set: {name: '1111'}});
//     console.log('mongo is ready');
// })();

// process.send('hello father');
// console.log(res);
// process.on('message', async (data) => {
    // console.log(data + '    son');
// });

function genMap(arr, key) {
    var map = {};
    for (var i = 0; i < arr.length; i++) {
        var k = arr[i][key];
        var v = arr[i];
        map[k] = v;
    }
    return map;
}

// const arr = [{age: 1, name: 'yang'},{age: 6, name: 'yang'},{age: 2, name: 'wen'},{age: 3, name: 'ju'}];
// // const res = _.keyBy(arr, 'name');
// const res = _.find(arr, o => {
//     return o.name === 'ju';
// });

// var users = [
//     {tea: 1, stu: 's', attend_data: '1月', subject:'数学'},
//     {tea: 2, stu: 's', attend_data: '2月', subject:'数学'},

//     {tea: 3, stu: 's', attend_data: '2月', subject:'数学'},
//     {tea: 4, stu: 's', attend_data: '1月', subject:'英语'},
// ];

// let a = 0;
// if(a){
//     console.log(111);
// }
const bar = new Date(0);
const res = bar.getTime();

