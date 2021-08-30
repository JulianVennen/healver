const {User, Snowflake, MessageEmbed} = require('discord.js');
const util = require('../../util');

module.exports = {
    name: 'avatar',

    aliases: ['av', 'pfp'],

    usage: '[@user|id]',

    description: 'Check a user\'s avatar',


    async execute(message, args, client) {
        /** @type {User|Snowflake} */
        let user = args.length ? util.userMentionToId(args[0]) : message.author;
        if (!(user instanceof User)) {
            try {
                user = await client.users.fetch(user);
            }
            catch (e) {
                if (e.httpStatus === 404) {
                    await message.reply(`:warning: | Failed to find user ${args}`);
                    return;
                }
                throw e;
            }
        }
        const avatarEmbed = new MessageEmbed()
            .setTitle(`Avatar of ${util.escapeFormatting(user.tag)}`)
            .setImage(user.displayAvatarURL({dynamic: true, size: 2048}))
            .setFooter(`Command executed by ${util.escapeFormatting(message.author.tag)}`)
            .setTimestamp();

        await message.reply({ embeds: [avatarEmbed] } );
    },
};