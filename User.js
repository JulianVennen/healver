class User {

    /**
     * @type {Snowflake}
     */
    id;

    /**
     * @type {Discord.User}
     */
    user;

    /**
     * @type {Client}
     */
    client;

    /**
     *
     * @param {Snowflake} id
     * @param {Client} client
     */
    constructor(id, client) {
        this.id = id;
        this.client = client;
    }

    /**
     * fetch this user
     * @return {Promise<User>}
     * @deprecated use this.fetchUser() instead
     */
    async fetch() {
        await this.fetchUser();
        return this;
    }

    /**
     * fetch this user
     * @return {Promise<Discord.User>}
     */
    async fetchUser() {
        try {
            this.user = await this.client.users.fetch(this.id);
        } catch (e) {
            if (e.code === APIErrors.UNKNOWN_USER) {
                this.user = null;
            } else {
                throw e;
            }
        }
        return this.user;
    }
}