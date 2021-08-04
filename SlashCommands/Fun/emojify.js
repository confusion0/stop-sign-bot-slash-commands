const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'emojify',
    description: 'Turn normal text into emojis!',
    options: [
        {
            name: 'text',
            description: "The text that you want to emojify",
            type: 'STRING',
            required: true
        }
    ],
    cooldown: 15000,
    reqPerm: "NONE",
    args: "<text>",

    /**
     * @param {Client} client
     * @param {CommandInteraction} message
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        if(args.length > 100) return interaction.editReply({ content: `${client.emotes.error} Please provide some text that is less than 100 characters` })

        const specialCodes = {
            '0': ':zero:',
            '1': ':one:',
            '2': ':two:',
            '3': ':three:',
            '4': ':four:',
            '5': ':five:',
            '6': ':six:',
            '7': ':seven:',
            '8': ':eight:',
            '9': ':nine:',
            '#': ':hash:',
            '*': ':asterisk:',
            '?': ':grey_question:',
            '!': ':grey_exclamation:',
            ' ': '   '
        }
        
        try {
        const text = args.join(" ").toLowerCase().split('').map(letter => {
            if(/[a-z]/g.test(letter)) {
                return `:regional_indicator_${letter}:`
            } else if (specialCodes[letter]) {
                return `${specialCodes[letter]}`
            }
            return letter;
        }).join('');

        interaction.followUp({ content: text })
    } catch(error) {
        interaction.followUp({ content: `${client.emotes.error} An error occurred: ERROR \`\`\`${error}\`\`\`` })
    }
    }
}