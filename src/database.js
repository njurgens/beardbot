/*
 * Copyright (c) 2015 Nick Jurgens <nicholas2010081@gmail.com>
 */
'use strict';

import sqlite3 from 'sqlite3';
import config from './config';


let database = new sqlite3.Database(config.db);


// generic error handler to log errors as they occur
database.on('error', err => console.log(err));


export default database;
