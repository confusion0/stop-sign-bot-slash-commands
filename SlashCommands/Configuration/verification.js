module.exports = {
    name: 'verification',
    description: 'Turn the verification on or off!',
    options: [
        {
            name: 'options',
            description: "The options to turn the verification for new-coming members on or off",
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'On',
                    value: 'On'
                },
                {
                    name: 'Off',
                    value: 'Off'
                }
            ]
        }
    ],
    cooldown: 60000,
    reqPerm: "ADMINISTRATOR",
    args: "<options>",
    
    /**
     * @param {Client} client
     * @param {CommandInteraction} message
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let [ options ] = args

        if(options === 'On') {
            client.gData.set(`${interaction.guild.id}:verification`, 'On')
            
            return interaction.followUp({ content: `${client.emotes.success} Turned on the auto decancered!` })
        } else {
            client.gData.delete(`${interaction.guild.id}:verification`)

            return interaction.followUp({ content: `${client.emotes.success} Turned off the auto decancered!` })
        }
    }
}