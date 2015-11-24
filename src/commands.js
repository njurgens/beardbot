/*
 * Module containing all commands and their handlers.
 *
 * Copyright (c) 2015 Nick Jurgens <nicholas2010081@gmail.com>
 */
'use strict';

import {flip, flop} from './plugins/flipflop';
import {command as karma} from './plugins/karma.js';
import marco from './plugins/marco';
import me from './plugins/me';
import ping from './plugins/ping';
import roll from './plugins/roll';
import {shrug} from './plugins/shrug';

export default {
    flip,
    flop,
    karma,
    marco,
    me,
    ping,
    roll,
    shrug
};
