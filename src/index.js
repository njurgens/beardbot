/*
 * Copyright (c) 2015 Nick Jurgens <nicholas2010081@gmail.com>
 */
'use strict';

import Poller from './poller';
import api from './api';

let poller = new Poller();

poller.dispatcher
    .register('ping', (text, message) => {
        console.dir(message);
        return 'pong';
    })
    .register('marco', (text, message) => {
        return 'polo';
    })
    .register('me', (text, message) => {
        console.dir(message);

        if (!text.length) {
            return null;
        }

        let {first_name, last_name} = message.from;
        let name = last_name ? `${first_name} ${last_name}` : first_name;

        return `${name} ${text}`;
    });

poller.start();
