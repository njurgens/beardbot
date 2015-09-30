/*
 * Jasmine test suite for the marco plugin.
 *
 * Copyright (c) 2015 Nick Jurgens <nicholas2010081@gmail.com>
 */
'use strict';

import marco from '../../plugins/marco';

describe('/marco', function() {
    it('returns polo', function() {
        expect(marco()).toEqual('polo');
    });
});
