module.exports = {
    name: 'giveaway-end',
    description: 'End an active giveaway on the server!',
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

        client.giveawaysManager.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        })
        .then(() => {
            interaction.followUp({ content: 'Giveaway will end in less than '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' seconds...' });
        })
        .catch((e) => {
            if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)){
                interaction.followUp({ content: `${client.emotes.error} This giveaway has already ended!` });
            } else {
                console.error(e);
                interaction.followUp({ content: `${client.emotes.error} An error occured...` });
            }
        });
    }
}