/*
 * Copyright (c) 2015 Nick Jurgens <nicholas2010081@gmail.com>
 */
export function get_name(message) {
    let {first_name, last_name} = message.from;
    return last_name ? `${first_name} ${last_name}` : first_name;
};

export function get_username(message) {
    let username = message.from.username;
    return username ? `@${username}` : null;
};
