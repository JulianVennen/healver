const util = require('../../util');
const {User} = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    name: 'userinfo',

    aliases: ['ui', 'u'],

    usage: '<@user|id>',

    description: 'Display information about a user',


    async execute(message, args, client) {
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

        let generic = '';
        generic += user.bot ? `**Username:** ${user.username} <:bot:881631704199077898> \n` : `**Username:** ${user.username} \n`;
        generic += `**User ID:** ${user.id} \n`
        generic += `**Created:** <t:${Math.round(user.createdAt.getTime() / 1000)}:R>`

        flags = util.toTitleCase(user.flags.toArray().join(', ')
            .replace(/[-_]/g, ' ')) || 'None';

        const embed = new Discord.MessageEmbed()
            .setTitle(`Information about ${user.username}`)
            .setFooter(`Command executed by ${message.author.tag}`)
            .setThumbnail(user.avatarURL())
            .addFields(
                /** @type {any} */ {name: '__**Generic**__', value: generic, inline: true},
                /** @type {any} */ {name: '__**Flags**__', value: flags, inline: false}
            )
            .setTimestamp()
        await message.reply( { embeds: [embed] } )
    },
};