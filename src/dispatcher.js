/*
 * Copyright 2015 (c) Nick Jurgens <nicholas2010081@gmail.com>
 */
'use strict';

import _ from 'lodash';

class CommandDispatcher {
    constructor() {
        this._commands = {};
        this._any = [];
        this._scanners = [];
    }

    any(text, message) {
        let resp = null;
        _(this._any).each(fn => {
            resp = fn(text, message)
            if (resp) {
                return false;
            }
        }).value();
        return resp;
    }

    dispatch(cmd, text, message) {
        if (!this._commands[cmd] || typeof this._commands[cmd] !== 'function') {
            return false;
        }
        return this._commands[cmd](text, message);
    }

    scan(text, message) {
        this._scanners.forEach(fn => process.nextTick(() => fn(text, message)));
    }

    register() {
        // if a function is passed as the first argument, then it runs against
        // all messages
        if (typeof arguments[0] === 'function') {
            // scanners are special in they should always run and do not
            // return a response
            if (typeof arguments[1] === 'object' && arguments[1].async === true) {
                this._scanners.push(arguments[0]);
            }
            else {
                this._any.push(arguments[0]);
            }
        }
        // if a string is passed as the first argument and a function as the second,
        // register the function to run whenever that string appears as a command
        else if (typeof arguments[0] === 'string' && typeof arguments[1] === 'function') {
            this._commands[arguments[0]] = arguments[1];
        }

        return this;
    }
}

export default CommandDispatcher;
