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

    /**
     * Register a collection of commands.
     *
     * @param {Object} container
     *      An Object containing commands and their handlers.
     * @returns {CommandDispatcher}
     *      Returns this CommandDispatcher.
     */
    register_commands(container) {
        _(container).each((fn, key) => {
            this._commands[key] = fn;
        }).value();
        return this;
    }

    /**
     * Register a collection of asynchronos scanners.
     *
     * @param {Array} container
     *      An Array containing scanners to execute on each message.
     * @returns {CommandDispatcher}
     *      Returns this CommandDispatcher.
     */
    register_async_scanners(container) {
        _(container).each((fn) => {
            // TODO: rename scanners to async_scanners
            this._scanners.push(fn);
        }).value();
        return this;
    }

    /**
     * Register a collection of synchronos scanners.
     *
     * @param {Array} container
     *      An Array containing scanners to execute on each message.
     * @returns {CommandDispatcher}
     *      Returns this CommandDispatcher.
     */
    register_sync_scanners(container) {
        _(container).each((fn) => {
            // TODO: rename any to sync_scanners
            this._any.push(fn);
        }).value();
        return this;
    }

    /**
     * Register a collection of plugins.
     *
     * @param {Object} container
     *      An Array or Object containing commands or scanners.  Contains
     *      commands in the case of an Object and scanners in the case of an
     *      Arrays.
     * @returns {CommandDispatcher}
     *      Returns this CommandDispatcher.
     */
    register(container, {async=false}={}) {
        if (container instanceof Array && async) {
            return this.register_async_scanners(container);
        }

        if (container instanceof Array && !async) {
            return this.register_sync_scanners(container);
        }

        return this.register_commands(container);
    }
}

export default CommandDispatcher;
