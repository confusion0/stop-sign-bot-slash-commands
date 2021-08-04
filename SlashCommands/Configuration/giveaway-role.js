const { VolumeInterface } = require("discord.js")

module.exports = {
    name: 'giveaway-role',
    description: 'Set or delete the giveaway role!',
    options: [
        {
            name: 'options',
            description: "The options to either set or delete the giveaway role",
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'Set',
                    value: 'Set'
                },
                {
                    name: 'Delete',
                    value: 'Delete'
                }
            ]
        },
        {
            name: 'role',
            description: "The giveaway role. (This argument is only needed when setting the giveaway role)",
            type: 'ROLE',
            required: false
        }
    ],
    cooldown: 60000,
    reqPerm: "ADMINISTRATOR",
    args: "<options> [role]",
    
    /**
     * @param {Client} client
     * @param {CommandInteraction} message
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let [ options, role ] = args 

        if(options.toLowerCase() === 'set') {

        if(!role) return interaction.editReply({ content: `${client.emotes.error} You must provide a role!`})
        
            let giveawayRole = interaction.guild.roles.cache.get(role)

            if(!giveawayRole) return interaction.editReply({ content: `${client.emotes.error} You must provide a valid role!`})

            client.gData.set(`${interaction.guild.id}:giveawayRole`, giveawayRole.id)
            interaction.followUp(`${client.emotes.success} Successfully set the giveaway manager role to ${giveawayRole.name}`)
        } else {
            client.gData.delete(`${interaction.guild.id}:giveawayRole`)
            interaction.followUp(`${client.emotes.success} Successfully deleted the giveaway manager role`)
        }
    }
}