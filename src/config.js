/*
 * Copyright (c) 2015 Nick Jurgens <nicholas2010081@gmail.com>
 */
'use strict';

import path from 'path';
import fs from 'fs';

const config_dir = path.join(process.env.HOME, '.beardbot'),
    config_file = path.join(config_dir, 'config.json'),
    default_config = {
        api_key: '',
        long_poll_timeout: 60,
        db: path.join(config_dir, 'beardbot.db')
    };

let config = {};

try {
}
catch (e) {
    console.dir(e);
}

try {
    config = JSON.parse(fs.readFileSync(config_file));
}
catch (e) {
    try { fs.mkdirSync(config_dir); } catch (e) { }

    fs.writeFileSync(config_file, JSON.stringify(default_config, null, 2));
}

config = Object.assign(default_config, config);

if (!config.api_key.length) {
    throw Error(`API key not found in config! Add it to ${config_file}.`);
}

console.log('loaded API key from config');
console.log('long-poll timeout set to %d', config.long_poll_timeout);

export default config;
