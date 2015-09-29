/*
 * Copyright (c) 2015 Nick Jurgens <nicholas2010081@gmail.com>
 */
import random from 'random-js';

export default function(text, message) {
    if (text.indexOf('D:') == -1) {
        return;
    }

    let phrases = [
        '*gasp*',
        'oh my!',
        'dun dun DUUUUNNNNN!'
    ];

    return random.picker(phrases)(random.engines.nativeMath);
};
