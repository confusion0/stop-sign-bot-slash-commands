const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'poll',
    description: 'Create a poll!',
    options: [
        {
            name: 'question',
            description: "The question for the poll",
            type: 'STRING',
            required: true
        }
    ],
    cooldown: 20000,
    reqPerm: "NONE",
    args: "<question>",

    /**
     * @param {Client} client
     * @param {CommandInteraction} message
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let [ question ] = args
        if(!question.endsWith("?")) question = question+="?"

        let embedPoll = new MessageEmbed()
        .setTitle(':bar_chart: Poll Time!')
        .setDescription(`► Question: ${question}`)
        .setColor('0x2F3136')
        .setTimestamp()

        let interactionEmbed = await interaction.followUp({ embeds: [embedPoll] });
        await interactionEmbed.react('🔼')
        await interactionEmbed.react('🔽')
    }
}