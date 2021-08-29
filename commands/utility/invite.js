const util = require('../../util');

module.exports = {
    name: 'invite',

    aliases: ['inv'],

    description: 'Invite me to your server(s)!',


    async execute(message, args, client) {
        await message.reply(`I am not public, meaning you can't invite me at the moment, sorry for the inconvenience!`);
    },
};