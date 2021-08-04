const ms = require('ms')

module.exports = {
    name: 'giveaway-start',
    description: 'Start a giveaway!',
    options: [
        {
            name: 'channel',
            description: "The giveaway channel",
            type: 'CHANNEL',
            required: true
        },
        {
            name: 'duration',
            description: "The giveaway duration",
            type: 'STRING',
            required: true
        },
        {
            name: 'winners',
            description: "The number of winners",
            type: 'STRING',
            required: true
        },
        {
            name: 'prize',
            description: "The giveaway prize",
            type: 'STRING',
            required: true
        }
    ],
    cooldown: 20000,
    reqPerm: "NONE",
    args: "<channel> <duration> <winners> <prize>",

    /**
     * @param {Client} client
     * @param {CommandInteraction} message
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let [ channel, giveawayDuration, giveawayNumberWinners, giveawayPrize ] = args
        let giveawayChannel = interaction.guild.channels.cache.get(channel)

        let guild = interaction.guild
        const giveawayrole = await client.gData.get(`${guild.id}:giveawayrole`)

        if(!(interaction.member.roles.cache.get(giveawayrole))){
            return interaction.editReply({ content: `${client.emotes.error} You need to have the the Giveaways role to delete giveaways.` });
        }

        if(giveawayChannel.type == "GUILD_VOICE") {
            return interaction.editReply({ content: `${client.emotes.error} Please choose a text channel!` })
        }

        if(isNaN(ms(giveawayDuration))) {
            return interaction.editReply({ content: `${client.emotes.error} You have to specify a valid duration!`})
        }

        if(isNaN(giveawayNumberWinners) || parseInt(giveawayNumberWinners) <= 0) {
            return interaction.editReply({ content:`${client.emotes.error} You have to specify a valid number of winners!` })
        }

        client.giveawaysManager.start(giveawayChannel, {
            // The giveaway duration
            time: ms(giveawayDuration),
            // The giveaway prize
            prize: giveawayPrize,
            // The giveaway winner count
            winnerCount: parseInt(giveawayNumberWinners),
            // Who hosts this giveaway
            hostedBy: client.config.hostedBy ? interaction.author : null,
            // Messages
            lastChance: {
                enabled: true,
                content: '⚠️ **LAST CHANCE TO ENTER !** ⚠️',
                threshold: 30000,
                embedColor: 'YELLOW'
            },

            messages: {
                giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY** 🎉🎉",
                giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
                timeRemaining: "Time remaining: **{duration}**!",
                inviteToParticipate: "React with 🎉 to participate!",
                winMessage: "Congratulations, {winners}! You won **{prize}**!\n{messageURL}",
                embedFooter: "New giveaway",
                noWinner: "👻 Giveaway cancelled, no valid participations.",
                hostedBy: "Hosted by: {user}",
                winners: "winner(s)",
                endedAt: "Ended at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
                }
            }
        });

        interaction.followUp({ content: `${client.emotes.success} Giveaway started in ${giveawayChannel}!` })
    }
}