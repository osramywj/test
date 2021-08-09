const Consul = require('consul');

module.exports = class ConsulConfig {
    constructor () {
        const serviceName = 'test3';
        this.consul = new Consul({
            host: '192.168.99.102',
            port: 8500,
            promisify: true,
        });

        this.consul.agent.service.register({
            name: serviceName,
            address: '192.168.43.115',
            port: 9999,
            check: {
                http: 'http://192.168.43.115:9999/health',
                interval: '10s',
                timeout: '5s',
            }
        }, function(err, result) {
            if (err) {
                console.error(err);
                throw err;
            }

            console.log(serviceName + ' 注册成功！');
        });
    }

    async getConfig(key) {
        const result = await this.consul.kv.get(key);

        if (!result) {
            return Promise.reject(key + '不存在');
        }

        return JSON.parse(result.Value);
    }

    async getUserConfig(key) {
        const result = await this.getConfig('node1/config');

        if (!key) {
            return result;
        }

        return result[key];
    }

    async setUserConfig(key, val) {
        const user = await this.getConfig('node1/config');

        user[key] = val;

        return this.consul.kv.set('node1/config', JSON.stringify(user))
    }
}