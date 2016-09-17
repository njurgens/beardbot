/*
 * Module for loading and writing configuration files.
 *
 * Copyright (c) 2015 Nick Jurgens <nicholas2010081@gmail.com>
 */
'use strict';

import fs from 'fs';
import path from 'path';


/**
 * Load configuration from file.
 *
 * @param {string} file - Path to configuration file.
 * @param {Object} default_config - Default configuration values.
 * @returns {Object} Parsed contents of file.
 */
function load_config(file, default_config) {
    let config = null;

    // if the config file does not exist or can't be parsed,
    // write a config file with the default config
    try {
        config = JSON.parse(fs.readFileSync(file));
    } catch (e) {
        write_config(default_config, config_file);
        config = default_config;
    }

    // overwrite defaults with loaded config
    config = Object.assign({}, default_config, config);

    // configuration must contain a valid API key
    validate_api_key(config, file);

    return config;
}


/**
 * Write configuration to a file.
 *
 * @param {Object} config - Object containing config to serialize and write
 *                          to file.
 * @param {string} file - Path to configuration file.
 */
function write_config(config, file) {
    try {
        fs.mkdirSync(path.dirname(file));
    } catch (e) { }

    fs.writeFileSync(file, JSON.stringify(config, null, 2));
}


/**
 * Check config contains valid API key.
 *
 * @param {Object} config - Object containing configuration.
 * @throws {Error} API key must be valid.
 */
function validate_api_key(config, file) {
    if (!config.api_key.length) {
        throw Error(`API key not found in config! Add it to ${file}.`);
    }
}


const config_file = '/etc/beardbot/config.json';
const default_config = {
    api_key: '',
    long_poll_timeout: 60,
    db: '/var/beardbot/beardbot.db'
};


export default load_config(config_file, default_config);
