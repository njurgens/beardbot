/*
 * Copyright (c) 2015 Nick Jurgens <nicholas2010081@gmail.com>
 */
'use strict';

import path from 'path';
import fs from 'fs';


const config_dir = path.join(process.env.HOME, '.beardbot'),
      config_file = path.join(config_dir, 'config.json');

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

    config = {
        api_key: ''
    };

    fs.writeFileSync(config_file, JSON.stringify(config, null, 2));
}

if (!config.api_key.length) {
    throw Error(`API key not found in config! Add it to ${config_file}.`);
}

export default config;
