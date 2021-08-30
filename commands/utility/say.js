const Discord = require("discord.js");
module.exports = {
    name: 'say',

    description: 'Say something through the bot',


    async execute(message, args, client) {
        if (!args.length) {
            return await message.reply(`You have to provide something for me to say!`);
        }

        const embed = new Discord.MessageEmbed()
            .setDescription(args.toString())
            .setFooter(`Command executed by ${message.author.tag}`)
        await message.channel.send( { embeds: [embed] } )
        try {
            await message.delete()
        } catch { }
    },
};