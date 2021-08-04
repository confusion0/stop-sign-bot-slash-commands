module.exports = {
    name: 'alt-identifier-delete',
    description: 'Add a lockdown channel!',
    cooldown: 30000,
    reqPerm: "ADMINISTRATOR",
    args: "",
    
    /**
     * @param {Client} client
     * @param {CommandInteraction} message
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let guild = interaction.guild
        client.gData.delete(`${guild.id}:altIdentifierChannel`)
        client.gData.delete(`${guild.id}:altIdentifierTime`)

        interaction.followUp({ content: `${client.emotes.success} Successfully deleted the alt identifier channel!` })
    }
}
