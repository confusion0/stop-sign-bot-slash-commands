const { glob } = require("glob");
const { promisify } = require("util");
const colors = require('colors')
const globPromise = promisify(glob);

module.exports = async (client) => {
    
    //Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));
    
    //Commands
    const slashCommands = await globPromise(`${process.cwd()}/SlashCommands/*/*.js`);
    const arrayOfSlashCommands = [];

    slashCommands.map((value) => {
        const file = require(value)
        if (!file?.name) return;

        client.slashCommands.set(file.name, file)
        console.log('Slash Command Loaded ' + file.name)
        arrayOfSlashCommands.push(file)
    });

    //Posting slash commands
    client.on("ready", async () => {
        client.guilds.cache.forEach(async (g) => {
            try {
                await client.guilds.cache.get(g.id).commands.set(arrayOfSlashCommands);
            } catch(error) {
            }
        });
    });
};