/*
 * Copyright (c) 2015 Nick Jurgens <nicholas2010081@gmail.com>
 */
'use strict';

import Api from 'telegram-bot';
import async from 'async';

import config from './config';
import CommandDispatcher from './dispatcher';

let CMD_RE = /^\/([^\s]+)\s*(.*)?/;


class Poller {

    constructor() {
        this._api = new Api(config.api_key);
        this._last_update = 0;
        this.dispatcher = new CommandDispatcher();
    }

    poll(next) {
        const limit = 100,
            timeout = config.long_poll_timeout,
            offset = this._offset;

        this._api.getUpdates({
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
                console.dir(json);
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
        let response = null;
        try {
            // scanners should run on all message text
            this.dispatcher.scan(message.text, message);

            // run tasks based on 
            if (parsed_cmd) {
                parsed_cmd[2] = parsed_cmd[2] || '';
                response = this.dispatcher.dispatch(parsed_cmd[1], parsed_cmd[2],
                                                    message);
            }
            else {
                response = this.dispatcher.any(message.text, message);
            }
        }
        catch (err) {
            response = 'Well, you broke something.  Great job.';
            console.log('Caught an exception when processing the following message:');
            console.dir(message);
            console.log(err.stack);
        }
        console.log('processing don');

        if (response) {
            this._api.sendMessage({
                chat_id: message.chat.id,
                text: response
            });
        }
    }

    start(commands) {
        async.forever((next) => this.poll(next));
    }

    get _offset() {
        return this._last_update + 1;
    }
}

export default Poller;
