/*
 * Copyright (c) 2015 Nick Jurgens <nicholas2010081@gmail.com>
 */
export default function(text, message) {
    console.dir(message);

    if (!text.length) {
        return null;
    }

    let {first_name, last_name} = message.from;
    let name = last_name ? `${first_name} ${last_name}` : first_name;

    return `${name} ${text}`;
};
