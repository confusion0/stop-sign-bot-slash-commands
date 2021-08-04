const ms = require('ms')

module.exports = {
    name: 'giveaway-edit',
    description: 'Edit an active giveaway on the server!',
    options: [
        {
            name: 'message-id',
            description: "The giveaway message ID",
            type: 'STRING',
            required: true
        },
        {
            name: 'giveaway-prize',
            description: 'The new giveaway prize for the giveaway',
            type: 'STRING',
            required: true
        },
        {
            name: 'time',
            description: 'The amount of time you want to add to the giveaway duration',
            type: 'STRING',
            required: true
        }
    ],
    cooldown: 20000,
    reqPerm: "NONE",
    args: "<message-id> <giveaway-prize> <time>",

    /**
     * @param {Client} client
     * @param {CommandInteraction} message
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let [ messageID, giveawayPrize, giveawayDuration ] = args

        let guild = interaction.guild
        const giveawayrole = await client.gData.get(`${guild.id}:giveawayrole`)

        if(!(interaction.member.roles.cache.get(giveawayrole))){
            return interaction.editReply({ content: `${client.emotes.error} You need to have the the Giveaways role to delete giveaways.` });
        }

        let giveaway = client.giveawaysManager.giveaways.find((g) => g.messageID === messageID && g.guildID === interaction.guild.id);

        if(!giveaway) {
            return interaction.editReply({ content: `${client.emotes.error} Unable to find a giveaway for \`` + messageID + '\`'  })
        }

        if(isNaN(ms(giveawayDuration))) {
            return interaction.editReply({ content: `${client.emotes.error} You have to specify a valid duration!` })
        }

        client.giveawaysManager.edit(giveaway.messageID, {
            addTime: ms(giveawayDuration),
            newPrize: giveawayPrize
        })
        .then(() => {
            interaction.followUp({ content: `${client.emotes.success} The giveaway has been edited successfully.`});
        })
        .catch((error) => {
            if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)){
                interaction.followUp({ content: `${client.emotes.error} This giveaway has already ended!` });
            } else {
            interaction.followUp({ content: `${client.emotes.error} An error occured while editing this giveaway! ERROR: \`\`\`${error}\`\`\`` })
            }
        });
    }
}