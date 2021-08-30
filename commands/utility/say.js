const Discord = require("discord.js");
const { color } = require('../../util')

module.exports = {
    name: 'say',

    description: 'Say something through the bot',

    permissions: 'MANAGE_GUILD',

    usage: '<argument>',

    async execute(message, args, client) {
        if (!args.length) {
            return await message.reply(`You have to provide something for me to say!`);
        }

        const embed = new Discord.MessageEmbed()
            .setDescription(args.toString())
            .setFooter(`Command executed by ${message.author.tag}`)
            .setTimestamp()
            .setColor(color.green)
        await message.channel.send( { embeds: [embed] } )
        try {
            await message.delete()
        } catch { }
    },
};