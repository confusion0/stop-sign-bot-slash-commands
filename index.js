const { Discord, Client, Collection } = require("discord.js");

const walkSync = require('./walkSync.js');

const path = require('path')

const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING",
    ],
});

module.exports = client;

// Global Variables
client.slashCommands = new Collection()
client.config = require("./config.json");
client.emotes = require('./config/emotes')

//Admins
client.ADMINS = [
    {"lastKnownTag": "confusion#6969", "ID": "790618859173969952"}
]

// Initializing the project
require("./handler")(client);

//MongoDB
const mongo = require('././handler/mongoose')

mongo().then(connection => {
    console.log('MongoDB Connection Established!')
})

//Giveaways
const giveawayModel = require('./models/giveaway')

// Init discord giveaways
const { GiveawaysManager } = require('discord-giveaways');

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
  // This function is called when the manager needs to get all giveaways which are stored in the database.
  async getAllGiveaways() {
      // Get all giveaways from the database. We fetch all documents by passing an empty condition.
      return await giveawayModel.find({});
  }

  // This function is called when a giveaway needs to be saved in the database.
  async saveGiveaway(messageID, giveawayData) {
      // Add the new giveaway to the database
      await giveawayModel.create(giveawayData);
      // Don't forget to return something!
      return true;
  }

  // This function is called when a giveaway needs to be edited in the database.
  async editGiveaway(messageID, giveawayData) {
      // Find by messageID and update it
      await giveawayModel.findOneAndUpdate({ messageID: messageID }, giveawayData).exec();
      // Don't forget to return something!
      return true;
  }

  // This function is called when a giveaway needs to be deleted from the database.
  async deleteGiveaway(messageID) {
      // Find by messageID and delete it
      await giveawayModel.findOneAndDelete({ messageID: messageID }).exec();
      // Don't forget to return something!
      return true;
  }
};

client.giveawaysManager = new GiveawayManagerWithOwnDatabase(client, {
    updateCountdownEvery: 30000,
    default: {
        botsCanWin: false,
        embedColor: "RED",
        embedColorEnd: '0x2F3136',
        reaction: "🎉"
    }
});


client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
});

//Slash command files
client.slashCommandFiles = walkSync(path.join(__dirname, '/SlashCommands'))

//Prerequisites
client.prerequisites = new Collection()
client.prerequisiteFiles = walkSync(path.join(__dirname, '/prerequisites'))

for (const file of client.prerequisiteFiles) {
    const prerequisite = require(`${file}`);
    client.prerequisites.set(prerequisite.name, prerequisite)
    prerequisite.run(client);
}

//Features
client.features = new Collection()
client.featureFiles = walkSync(path.join(__dirname, '/features'))

for (const file of client.featureFiles) {
    const feature = require(`${file}`);
    client.features.set(feature.name, feature)
    feature.run(client);
}

client.login(client.config.token);
