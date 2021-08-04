const discordTogether = require('../../Client/discordTogether')

module.exports = {
    name: 'youtubetogether',
    description: 'Watch yotube in a voice channel together!',
    options: [
        {
            name: "channel",
            description: "Give a channel where you want to watch youtube",
            type: "CHANNEL",
            required: true
        },
    ],
    cooldown: 30000,
    reqPerm: "NONE",
    args: "<channel>",

    /**
     * @param {Client} client
     * @param {CommandInteraction} message
     * @param {String[]} args
     */
     run: async (client, interaction, args) => {
        const [ channelID ] = args;
        const channel = interaction.guild.channels.cache.get(channelID)

        if(channel.type !== "GUILD_VOICE") {
            return interaction.followUp({
                content: `${client.emotes.error} Please choose a voice channel next time!`,
                ephemeral: true 
            })
        }

        discordTogether
        .createTogetherCode(channelID, "youtube")
        .then((x) => interaction.followUp({ content: `Click the following link to watch Youtube in a voice channel! ${x.code}` }));
    }
}