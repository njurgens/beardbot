/*
 * Copyright (c) 2015 Nick Jurgens <nicholas2010081@gmail.com>
 */
'use strict';

import _ from 'lodash';
import database from '../database';
import * as util from '../util';


let db_schema = 'CREATE TABLE IF NOT EXISTS karma (name TEXT PRIMARY KEY, karma INTEGER)',
    db_load_all_karma = 'SELECT name, karma FROM karma',
    db_init = false;

let incr_re = /[^\s]+\+\+|\+\+[^\s]+/,
    decr_re = /[^\s]+--|--[^\s]+/,
    name_re = /[^\s]+/,
    karma_cache = {};


function init_table() {
    database
        .exec(db_schema, (err) => { if (err !== null) { console.log(err); }})
        .each(db_load_all_karma, load_karma, () => db_init = true);
}


function load_karma(err, row) {
    if (err !== null) {
        console.error(err);
        return;
    }

    karma_cache[row.name] = row.karma;
}


export function scanner(text, message) {
    // if the database is not initialized, run when it is
    if (!db_init) {
        return database.on('open', () => scanner(text, message));
    }

    let incr = _(text.match(incr_re) || [])
        .map(name => name.replace('++', ''))
        .value();
    let decr = _(text.match(decr_re) || [])
        .map(name => name.replace('--', ''))
        .value();
    let changed = _(incr).concat(decr)
        .uniq()
        .value();

    // initialize names karma to zero
    // TODO: turn karma_cache into a default dict using Proxy
    changed.forEach(name => {
        if (typeof karma_cache[name] === 'undefined') {
            karma_cache[name] = 0;
        }
    });

    incr.forEach((match) => {
        ++karma_cache[match];
    });

    decr.forEach((match) => {
        --karma_cache[match];
    });

    // write changes from the cache to the database
    changed.forEach((name) => {
        console.log(`updated karma for ${name} to ${karma_cache[name]}`);
        database.run('INSERT OR REPLACE INTO karma (name, karma) VALUES (?, ?)', name, karma_cache[name]);
    });
};


export function command(text, message) {
    let name = '';
    if (text === '') {
        let username = util.get_username(message);

        if (!username) {
            return 'You need to set a username before you can get karma!';
        }

        name = username;
    }
    else {
        name = text.match(name_re);
    }

    return `karma for ${name} is ${karma_cache[name] || 0}`;
};


database.on('open', init_table);
