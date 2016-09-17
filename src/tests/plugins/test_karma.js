/*
 * Jasmine test suite for the ping plugin.
 *
 * Copyright (c) 2015 Nick Jurgens <nicholas2010081@gmail.com>
 */
'use strict';

import * as Karma from '../../plugins/karma';

describe('karma regexes', function() {
    beforeEach(function() {
        spyOn(console, 'dir');
    });

    it('matches post increment operator', function() {
        let cases = [
            {string: '', count: 0},
            {string: 'bread++', count: 1},
            {string: 'bread++ for being awesome', count: 1},
            {string: 'bread++ beer++', count: 2}
        ]

        cases.forEach(({string, count}) => {
            let matches = string.match(Karma.POST_INCR_RE) || [];
            expect(matches.length).toEqual(count)
        });
    });
});
