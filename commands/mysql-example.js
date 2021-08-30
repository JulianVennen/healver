module.exports = {
    name: 'mysql-example',

    description: 'Query some data.',

    usage: '',

    cooldown: 3,

    async execute(message, args, client, database) {
        //await database.query("INSERT INTO example (content) VALUES (?)", ['example-value']);
        const data = await database.query("SELECT * FROM example");
        message.reply(data[0][0]?.content);
    },
};