module.exports = {
    name: 'mysql-example',

    description: 'Query some data.',

    usage: '',

    cooldown: 3,

    async execute(message, args, client, database) {
        // // insert something
        //await database.query("INSERT INTO example (content) VALUES (?)", ['example-value']);
        // select something
        const data = await database.query("SELECT * FROM example");
        //use that data
        message.reply(data[0][0]?.content);
    },
};