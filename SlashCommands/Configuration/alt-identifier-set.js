const ms = require('ms');

module.exports = {
    name: 'alt-identifier-set',
    description: 'Set the alt-identifier channel',
    options: [
        {
            name: 'channel',
            description: "The alt-identifier channel",
            type: 'CHANNEL',
            required: true
        },
        {
            name: 'time',
            description: "The minimum account age",
            type: 'STRING',
            required: true
        }
    ],
    cooldown: 30000,
    reqPerm: "ADMINISTRATOR",
    args: "<channel> <time>",
    
    /**
     * @param {Client} client
     * @param {CommandInteraction} message
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let guild = interaction.guild
        let [ altIdentifierChannel, time ] = args

        let channel = interaction.guild.channels.cache.get(altIdentifierChannel)

        if(channel.type == "GUILD_VOICE") {
            return interaction.editReply({ content: `${client.emotes.error} Please choose a text channel!` })
        }

        if(isNaN(ms(time))) {
            return interaction.editReply({ content: `${client.emotes.success} Please provide a valid time!` })
        }

        if(ms(time) > ms('30 days')) {
            return interaction.editReply({ content: `${client.emotes.error} The time must be under 30 days!` })
        }

        client.gData.set(`${guild.id}:altIdentifierChannel`, channel.id)
        client.gData.set(`${guild.id}:altIdentifierTime`, time)

        interaction.followUp({ content: `${client.emotes.success} Set the alt identifier channel to ${channel}!` })
    }
}