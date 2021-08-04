const { MessageEmbed } = require('discord.js')
const figlet = require('figlet');

module.exports = {
    name: 'ascii',
    description: 'Turn normal text into ascii text!',
    options: [
        {
            name: 'font',
            description: "The font for the output",
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: '3D-ASCII',
                    value: "3D-ASCII"
                },
                {
                    name: '4Max',
                    value: "4Max"
                },
                {
                    name: '3-D',
                    value: "3-D"
                },
                {
                    name: 'Binary',
                    value: "Binary"
                },
                {
                    name: 'Twisted',
                    value: "Twisted"
                },
                {
                    name: 'Ghost',
                    value: "Ghost"
                },
                {
                    name: 'Banner3-D',
                    value: "Banner3-D"
                },
                {
                    name: 'Blocks',
                    value: "Blocks"
                },
                {
                    name: 'Mirror',
                    value: "Mirror"
                },
                {
                    name: 'Octal',
                    value: "Octal"
                },
                {
                    name: 'Shadow',
                    value: "Shadow"
                },
                {
                    name: 'Lean',
                    value: "Lean"
                },
                {
                    name: 'Keyboard',
                    value: "Shadow"
                },
                {
                    name: 'Reverse',
                    value: "Reverse"
                },
                {
                    name: 'Thick',
                    value: "Thick"
                },
                {
                    name: 'Thin',
                    value: "Thin"
                },
            ]
        },
        {
            name: 'text',
            description: "The text that you want to turn into ascii text",
            type: 'STRING',
            required: true
        }
    ],
    cooldown: 5000,
    reqPerm: "NONE",
    args: "<font> <text>",

    /**
     * @param {Client} client
     * @param {CommandInteraction} message
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const [ font, text ] = args

        if(text.length > 50) return interaction.editReply({ content: `${client.emotes.error} Please provide text that is shorter than 50 characters` })

        figlet.text(text, { font: font }, function (err, data){
            if(err){
                console.log('Something went wrong');
                console.dir(err);
                return interaction.editReply({ content: `${client.emotes.error} Something went wrong! ERROR: \`\`\`${err}\`\`\``})
            }
            if(data.length > 2000) return interaction.editReply({ content: `${client.emotes.error} Please provide text that is less than 2000 characters.` })

            return interaction.followUp({ content: '```' + data + '```' })
        })
    }
}
