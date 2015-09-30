/*
 * Jasmine test suite for the ping plugin.
 *
 * Copyright (c) 2015 Nick Jurgens <nicholas2010081@gmail.com>
 */
'use strict';

import ping from '../../plugins/ping';

describe('/ping', function() {
    beforeEach(function() {
        spyOn(console, 'dir');
    });

    it('returns pong', function() {
        expect(ping()).toEqual('pong');
    });

    it('logs the message', function() {
        let message = {};
        ping('', message);
        expect(console.dir).toHaveBeenCalledWith(message);
    });
});
