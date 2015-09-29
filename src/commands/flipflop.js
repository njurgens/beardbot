/*
 * Copyright (c) 2015 Nick Jurgens <nicholas2010081@gmail.com>
 */
import fliptext from 'flip-text';
import {get_name} from '../util';


export function flip(text, message) {
    let flipped = '';
    if (text == '') {
        flipped = '┻━┻';
    }
    else if (text.toLowerCase() == 'beardbot') {
        flipped = fliptext(get_name(message));
    }
    else {
        flipped = fliptext(text);
    }

    return `(╯°□°）╯︵ ${flipped}`;
};

export function flop(text, message) {
    let flopped = '';
    if (text == '') {
        flopped = '┬─┬';
    }
    else {
        flopped = text;
    }

    return `${flopped}ノ( º _ ºノ)`;
};
