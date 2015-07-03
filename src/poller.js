/*
 * Copyright (c) 2015 Nick Jurgens <nicholas2010081@gmail.com>
 */
'use strict';

import api from './api';
import async from 'async';
import CommandDispatcher from './dispatcher';

var CMD_RE = /^\/([^\s]+)\s*(.*)?/;

class Poller { constructor() {
        this._last_update = 0;
        this.dispatcher = new CommandDispatcher();
    }

    poll(next) {
        const limit = 100,
            timeout = 10,
            offset = this._offset;

        api.getUpdates({
            offset,
            limit,
            timeout
        }, (err, req, body) => {
            var json;

            try {
                json = JSON.parse(body);
            }
            catch (e) {
                console.error('failed to parse json:\n%s', body);
                return next();
            }

            if (json.ok !== true) {
                console.warn('API returned non-ok response!');
                return next();
            }

            json.result.forEach((update) => this._handleUpdate(update));

            // schedule the next polling request
            return next();
        });
    }

    _handleUpdate(update) {
        let message = update.message,
            initialized = this._last_update;

        this._last_update = update.update_id;

        if (!message || !message.text) {
            console.warn('no message text');
            return;
        }

        // strip out any returns and line-feeds
        message.text = message.text.replace(/[\r\n]+/g, ' ');

        let parsed_cmd = CMD_RE.exec(message.text);
        if (!parsed_cmd) {
            console.warn('unrecognized format');
            return;
        }
        parsed_cmd[2] = parsed_cmd[2] || '';

        let response =
            this.dispatcher.dispatch(parsed_cmd[1], parsed_cmd[2], message);

        if (response) {
            api.sendMessage({
                chat_id: message.chat.id,
                text: response
            });
        }
    }

    start(commands) {
        async.forever((next) => this.poll(next));
    }

    init(commands) {

    }

    get _offset() {
        return this._last_update + 1;
    }
}

export default Poller;
