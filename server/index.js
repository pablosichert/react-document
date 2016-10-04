import { exec } from 'child_process';
import Koa from 'koa';
import defaults from '../config.example';

let config = defaults;

new Promise(resolve => {
    config = require('../config').default;

    resolve();
})
.catch(async () => {
    try {
        await new Promise((resolve, reject) => {
            exec('cp config.example.js config.js', error => {
                if (error) {
                    return reject(error);
                }

                resolve();
            });
        });

        // eslint-disable-next-line no-console
        console.info('No config file found, created new config.js');
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed trying to create config.js', error);
    }
})
.then(() => {
    const app = new Koa;

    app.use(async context => {
        context.body = 'Hello world!';
        context.status = 200;
    });

    const {
        port
    } = config;

    app.listen(port);

    // eslint-disable-next-line no-console
    console.info(`App running at localhost:${port}`);
});
