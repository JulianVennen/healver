'use strict';

const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const config = require('./config.json');
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS], allowedMentions: { parse: [] } });

//const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Discord.Collection();
const prefix = config.prefix

const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}
client.on('ready', () => {
    client.user.setPresence( { activity: { type: 'WATCHING', name: 'my prefix (;)' }, status: 'dnd' } )
    console.log('I am ready!');
});
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;
    //if (!client.commands.has(commandName)) return;

    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return message.reply(`You do not have the required permissions for this: \`${command.permissions}\``);
        }
    }

    if (command.args && !args.length) {
        return message.reply(`Please specify arguments for this command - \`${command.usage.toString()}\``);
    }
    try {
        command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply(`there was an error trying to execute that command!\n\`${error}\``);
    }
});
client.login(config.token);