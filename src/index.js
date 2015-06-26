/*
 * Copyright (c) 2015 Nick Jurgens <nicholas2010081@gmail.com>
 */
'use strict';

import app from './app';
import api from './api';
import config from '../config';

api.debug = true;

let server = app.listen(3000, function() {
    let host = server.address().address,
        port = server.address().port;

    console.log('listening at http://%s:%s', host, port);

    api.api_key = config.api_key;
    api.setWebhook(config.update_uri, function(err, resp, body) {
        console.dir(body);
    });

    app.post('/updates', function(err, resp, body) {
        console.dir(body);
    });
});
