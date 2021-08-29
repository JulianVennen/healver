const Discord = require('discord.js');
const util = require('../../util');

module.exports = {
    name: 'roleinfo',

    aliases: ['ri', 'role'],

    description: 'Get info about a role',

    async execute(message, args, client) {
        if (!args.length) {
            return await message.channel.send(`You have to provide a role ID ${message.author}!`);
        }

        let roleid = util.roleMentionToId(args[0]);

        if (!roleid) return sendUsage();

        let role = message.guild.roles.resolve(roleid);
        if (!role) return await message.channel.send('This is not a valid role ID.');


        let permissions;
        if (role.permissions.has('ADMINISTRATOR')) {
            permissions = 'Administrator';
        }
        else {
            permissions = util.toTitleCase(role.permissions.toArray().join(', ')
                .replace(/[-_]/g, ' ')) || 'None';
        }

        const embed = new Discord.MessageEmbed()
            .setTitle(`About ${role.name}`)
            .setColor(role.color)
            .setDescription(`**Role name:** ${role.name} (${role.id})\n` +
                `**Created on** ${role.createdAt.toUTCString()}\n` +
                `**Managed:** ${role.managed ? 'Yes' : 'No'}\n` +
                `**Position:** ${role.position} (from below)\n` +
                `**Hoisted:** ${role.hoist ? 'Yes' : 'No'}\n` +
                `**Color:** \`${role.hexColor}\` (\`${role.color}\`)\n` +
                `**Permissions:** ${permissions}`);

        await message.channel.send({ embeds: [embed] });
    }
}