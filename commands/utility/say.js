const Discord = require("discord.js");
const { color } = require('../../util')

module.exports = {
    name: 'say',

    args: true,

    description: 'Say something through the bot',

    permissions: 'MANAGE_GUILD',

    usage: '<argument>',

    async execute(message, args, client) {
        const embed = new Discord.MessageEmbed()
            .setDescription(args.join(' '))
            .setFooter(`Command executed by ${message.author.tag}`)
            .setTimestamp()
            .setColor(color.green)
        await message.channel.send( { embeds: [embed] } )
        try {
            await message.delete()
        } catch { }
    },
};