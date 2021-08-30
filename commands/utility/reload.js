const fs = require('fs');

module.exports = {
    name: 'reload',

    description: 'Reloads a command',

    args: true,

    usage: '<command>',

    async execute(message, args, client) {
        if (!client.application.owner)
            await client.application.fetch()

        if (client.application.owner.id !== message.author.id) {
            return message.reply('This command is restricted to my developers.')
        }

            const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) {
            return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
        }

        const commandFolders = fs.readdirSync('./commands');
        const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));

        delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

        try {
            const newCommand = require(`../${folderName}/${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send(`Command \`${newCommand.name}\` was reloaded!`);
            console.log(`[RELOAD] Command \`${newCommand.name}\` was reloaded by ${message.author.tag} (${message.author.id})`)
        } catch (error) {
            console.error(error);
            message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
        }
    },
};
