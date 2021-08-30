const Discord = require('discord.js');
const util = require('../../util');
const { color } = require('../../util');

module.exports = {
    name: 'serverinfo',

    aliases: ['si', 'guildinfo'],

    description: 'Get the guild\'s info',


    async execute(message, args, client) {
        const guild = message.guild;

        let owner = await client.users.fetch(guild.ownerId)

        let generic = '';
        generic += `**Owner:** <@!${guild.ownerId}> (${owner.tag})\n`;
        generic += `**Owner ID:** ${guild.ownerId} \n`;
        generic += `**Created:** <t:${Math.round(guild.createdAt.getTime() / 1000)}:R> \n`;
        generic += `**Guild ID:** ${guild.id} \n`;

        let statistics = '';
        statistics += `**Members:** ${guild.memberCount} \n`;
        statistics += `**Max members:** ${guild.maximumMembers} \n`;
        statistics += `**Verified:** ${guild.verified ? 'Yes' : 'No'} \n`;
        statistics += `**Partnered:** ${guild.partnered ? 'Yes' : 'No'} \n`;

        const features = guild.features.map(feature => util.toTitleCase(feature.replace(/[-_]/g, ' ')));


        const embed = new Discord.MessageEmbed()
            .setTitle(`Info ${message.guild.name}`)
            .setThumbnail(guild.iconURL({dynamic: true, size: 2048}))
            .setColor(color.blue)
            .setTimestamp()
            .setFooter(`Command executed by ${message.author.tag}`)
            .addFields(
                /** @type {any} */ {name: '__**Generic**__', value: generic, inline: true},
                /** @type {any} */ {name: '__**Statistics**__', value: statistics, inline: true },
                /** @type {any} */ {name: '__**Features**__', value: features.join(', ') || 'None', inline: false }
            )
        message.reply({ embeds: [embed] });
    }
}