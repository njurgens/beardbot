/*
 * Copyright (c) 2015 Nick Jurgens <nicholas2010081@gmail.com>
 */
import _ from 'lodash';
import random from 'random-js';
import {flip} from './flipflop';
import util from '../util';

let engine = random.engines.mt19937().autoSeed(),
    match_re = /^(\d+)?d(\d+)(-L|-l)?$/,
    distributions = {};

function get_dist(die) {
    if (typeof distributions[die] === 'undefined') {
        distributions[die] = random.integer(1, die);
    }
    return distributions[die];
}

function roll_dice(text, message) {
    let parsed = match_re.exec(text.trim());

    if (!parsed) {
        return 'Sorry, but you aren\'t making any sense.';
    }

    let num = parsed[1],
        die = parsed[2],
        modifier = parsed[3];

    // only positive, non-zero dice are valid
    if (die < 1) {
        return flip(util.get_name(message));
    }

    // roll at minimum 1 die
    if (typeof num === 'undefined') {
        num = 1;
    }

    // limits on how many dice can be rolled
    if (num > 20) {
        return `I'm too lazy to roll that many dice.`;
    }

    // compute the result
    let result = [],
        dist = get_dist(die);
    try {
        _.times(num, () => {
            result.push(dist(engine));
        });
    } catch(e) {
        return 'Well, good job breaking everything.\n#suckstosuck';
    }

    if (modifier && modifier.toLowerCase() === '-l') {
        // sort and drop lowest
        result.sort((lhs, rhs) => lhs < rhs);
        result.pop();
    }

    return result.join(', ');
}

function gen_stats() {
    let results = [],
        dist = get_dist(6);

    _.times(6, (n) => {
        let series = [];
        _.times(4, () => {
            try {
                series.push(dist(engine));
            } catch(e) {
                return 'Things broke';
            }
        });
        series.sort((lhs, rhs) => lhs < rhs);
        console.log(`series ${n}: [${series.join(', ')}]`);
        series.pop();
        results.push(_.sum(series));
    })

    console.log(`[${results.join(', ')}]`);

    // sort by highest rolls
    results.sort((lhs, rhs) => lhs < rhs);

    return results.join(', ');
}

export default function(text, message) {
    if (text === '') {
        return 'You need to tell me what to roll.';
    }

    if (text === 'stats') {
        return gen_stats();
    }
    return roll_dice(text, message);
};
