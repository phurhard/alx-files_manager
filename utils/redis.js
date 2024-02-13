const redis = require ('redis');
const promisify = require ('promisify');


class RedisClient {
    constructor(options) {
        this.client = redis.createClient(options);
    
        this.client.on('error', (err) => {
            console.log(err);
        });

        this.getAsync = promisify(this.client.get).bind(this.client);
        this.setAsync = promisify(this.client.set).bind(this.client);
        this.delAsync = promisify(this.client.del).bind(this.client);
    }

    isAlive() {
        return this.client.connected;
    }

    async get(key) {
        try {
            const value =  await this.getAsync(key);
            return value;
        } catch (err) {
            console.log(err);
            throw error;
        }
    }

    async set(key, value, ttl) {
        try {
            await this.setAsync(key, value, 'EX', ttl);
        } catch (err) {
            console.log(err);
            throw error;
        }
    }

    async del(key) {
        try {
            await this.delAsync(key);
        } catch (err) {
            console.log(err);
            throw error;
        }

    }
}

module.exports = RedisClient;
