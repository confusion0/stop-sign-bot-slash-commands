const { Util } = require("discord.js")
const Schema = require('../../models/reactionroles')

module.exports = {
    name: 'reaction-role-delete',
    description: 'Delete the reaction roles!',
    cooldown: 60000,
    reqPerm: "ADMINISTRATOR",
    args: "",
    
    /**
     * @param {Client} client
     * @param {CommandInteraction} message
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        Schema.findOne({ Guild: interaction.guild.id }, async(err, data) => {
            if(data) {
                await Schema.findOneAndDelete({ Guild: interaction.guild.id }, data);
            }
        })

        interaction.followUp({ content: `${client.emotes.success} I have successfully deleted the current reaction roles!`})
    }
}
