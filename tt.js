const _ = require('lodash');


const obj = {a: 3};

const arr = [1,2];

Promise.all(arr.map(async id => {
    let test = obj;
    if (id===1) test = Object.assign(obj, {b:4});
    console.log(test);
}));