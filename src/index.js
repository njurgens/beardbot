/*
 * Copyright (c) 2015 Nick Jurgens <nicholas2010081@gmail.com>
 */
'use strict';

import random from 'random-js';
import Poller from './poller';
import commands from './commands';
import scanners from './scanners';
import async_scanners from './async_scanners';


let poller = new Poller();

poller.dispatcher
    .register(commands)
    .register(scanners)
    .register(async_scanners, {async: true});

poller.start();
