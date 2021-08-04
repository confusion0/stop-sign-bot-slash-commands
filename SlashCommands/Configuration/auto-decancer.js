module.exports = {
    name: 'auto-decancer',
    description: 'Turn the auto decancer on or off!',
    options: [
        {
            name: 'options',
            description: "The options to either turn the auto decancer on or off",
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
        },
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
        let guild = interaction.guild
        let [ options ] = args

        if(options === 'On') {
            client.gData.set(`${guild.id}:autoDecancer`, 'On')

            return interaction.followUp({ content: `${client.emotes.success} Turned on the auto decancered!` })
        } else {
            client.gData.delete(`${guild.id}:autoDecancer`)

            return interaction.followUp({ content: `${client.emotes.success} Turned off the auto decancered!` })
        }
    }
}
