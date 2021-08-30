const Discord = require("discord.js");
const util = require("../../util")

module.exports = {
    namle: 'support',

    description: 'Get support here',


    async execute(message, args, client) {
        const embed = new Discord.MessageEmbed()
            .setDescription(`[join our support server](${util.links.support})`)
            .setColor(util.color.blue)

        await message.reply({ embeds: [embed] });

    },
};