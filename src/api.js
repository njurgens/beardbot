/*
 * Copyright (c) 2015 Nick Jurgens <nicholas2010081@gmail.com>
 */
'use strict';

import Api from 'telegram-bot';
import config from '../config';

let api = new Api();

api.api_key = config.api_key;

export default api;
