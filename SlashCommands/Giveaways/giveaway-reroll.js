module.exports = {
    name: 'giveaway-reroll',
    description: 'Reroll a giveaway on the server!',
    options: [
        {
            name: 'message-id',
            description: "The giveaway message ID",
            type: 'STRING',
            required: true
        },
    ],
    cooldown: 10000,
    reqPerm: "NONE",
    args: "<message-id>",

    /**
     * @param {Client} client
     * @param {CommandInteraction} message
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let [ messageID ] = args

        let guild = interaction.guild
        const giveawayrole = await client.gData.get(`${guild.id}:giveawayrole`)

        if(!(interaction.member.roles.cache.get(giveawayrole))){
            return interaction.editReply({ content: `${client.emotes.error} You need to have the the Giveaways role to delete giveaways.` });
        }

        let giveaway = client.giveawaysManager.giveaways.find((g) => g.messageID === messageID && g.guildID === interaction.guild.id);

        if(!giveaway) {
            return interaction.editReply({ content: `${client.emotes.error} Unable to find a giveaway for \`` + messageID + '\`'  })
        }

        client.giveawaysManager.reroll(giveaway.messageID, {
            messages: {
                congrat: '🎉 New winner(s): {winners}! Congratulations, you won **{prize}**!\n{messageURL}',
                error: `${client.emotes.error} No valid participations or no new winner(s) can be chosen!`
            }
        })
        .then(() => {
            // Success message
            interaction.followUp({ content: `${client.emotes.success} Giveaway rerolled!` });
        })
        .catch((e) => {
            if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)){
                interaction.followUp({ content: `${client.emotes.error} This giveaway has not ended yet!` });
            } else {
                console.error(e);
                interaction.followUp({ content: `${client.emotes.error} An error occured...` });
            }
        });
    }
}