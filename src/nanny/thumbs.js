/*
 * Copyright (c) 2015 Nick Jurgens <nicholas2010081@gmail.com>
 */
import random from 'random-js';

let thumbs_re = /\([yY]\)/;

export default function(text, message) {
    if (text.match(thumbs_re) === null) {
        return;
    }

    let {first_name, last_name} = message.from;
    let name = last_name ? `${first_name} ${last_name}` : first_name;
    let replaced = text.replace(thumbs_re, '👍');
    let phrases = [
        `What ${name} means to say is '${replaced}'.\n#suckstosuck`,
        `I think ${name} means '${replaced}.'`,
        `Don't you mean '${replaced}'?`,
        `'${replaced}' is really a much better way to say that.`,
    ];
    return random.picker(phrases)(random.engines.nativeMath);
};
