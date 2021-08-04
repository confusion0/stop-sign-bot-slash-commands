const Schema = require("../../models/lockdown");

module.exports = {
    name: 'lockdown-delete',
    description: 'Delete the lockdown channels!',
    cooldown: 30000,
    reqPerm: "ADMINISTRATOR",
    args: "",
    
    /**
     * @param {Client} client
     * @param {CommandInteraction} message
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const data = await Schema.findOne({
            Guild: interaction.guild.id
        })

        if(!data) return interaction.editReply({ content: `${client.emotes.error} There is no data to be deleted!`})

        Schema.findOne({ Guild: interaction.guild.id }, async(err, data) => {
            if(data) {
                await Schema.findOneAndDelete({ Guild: interaction.guild.id }. data)
            }
        })

        interaction.followUp({ content: `${client.emotes.success} I have successfully deleted the current lockdown channel data!`})
    }
}