/*
 * Copyright (c) 2015 Nick Jurgens <nicholas2010081@gmail.com>
 */
'use strict';

import random from 'random-js';

import Poller from './poller';

import {flip, flop} from './commands/flipflop';
import marco from './commands/marco';
import me from './commands/me';
import ping from './commands/ping';
import roll from './commands/roll';

import gasp from './nanny/gasp';
import thumbs from './nanny/thumbs';

import * as karma from './scanners/karma';


let poller = new Poller();

poller.dispatcher
    .register('ping', ping)
    .register('marco', marco)
    .register('me', me)
    .register('flip', flip)
    .register('flop', flop)
    .register('roll', roll)
    .register(gasp)
    .register(thumbs)
    .register(karma.scanner, {async: true})
    .register('karma', karma.command);

poller.start();
