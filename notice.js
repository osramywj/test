const axios = require('axios');
const schedule = require('node-schedule');

const urls = ['https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=e7452245-490f-48d4-8edb-b3041424490b'];

const  scheduleCronstyle = ()=>{
    schedule.scheduleJob('0 55 8 * * 1-6',()=>{
        for (let url of urls) {
            axios.post(url, {msgtype: 'text', text: {content: '上班记得打卡', mentioned_list: ['@all']}});
        }
    }); 
    schedule.scheduleJob('0 0 19 * * 1-6',()=>{
        for (let url of urls) {
            axios.post(url, {msgtype: 'text', text: {content: '下班记得打卡，写日报', mentioned_list: ['@all']}});
        }
    }); 
    schedule.scheduleJob('0 00 17 * * *',()=>{
        for (let url of urls) {
            axios.post(url, {msgtype: 'text', text: {content: '快去填健康上报表格！', mentioned_list: ['@all']}});
        }
    }); 
};

scheduleCronstyle();