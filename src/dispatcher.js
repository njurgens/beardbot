/*
 * Copyright 2015 (c) Nick Jurgens <nicholas2010081@gmail.com>
 */
'use strict';

class CommandDispatcher {
    constructor() {
        this._commands = {};
    }

    dispatch(cmd, text, message) {
        if (!this._commands[cmd] || typeof this._commands[cmd] !== 'function') {
            return false;
        }
        return this._commands[cmd](text, message);
    }

    register(cmd, handler) {
        if (this._commands[cmd]) {
            console.warn('handler for %s already registered', cmd);
            return this;
        }
        this._commands[cmd] = handler;
        return this;
    }
}

export default CommandDispatcher;
