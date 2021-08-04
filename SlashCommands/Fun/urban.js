const { MessageEmbed, CommandInteraction, Client } = require('discord.js')
const axios = require('axios')

module.exports = {
    name: 'urban',
    description: 'Use this command to search terms, phrases or words in the urban dictionary!',
    options: [
        {
            name: 'word',
            description: "The term, prase, or word that you want to search in the urban dictionary",
            type: 'STRING',
            required: true
        }
    ],
    cooldown: 10000,
    reqPerm: "NONE",
    args: "<word>",

    /**
     * @param {Client} client
     * @param {CommandInteraction} message
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let [ query ] = args;

        query = encodeURIComponent(query)
   
        const { data: {list} } = await axios.get(`https://api.urbandictionary.com/v0/define?term=${query}`)

        const [answer] = list

        const embed = new MessageEmbed()
        .setTitle(answer.word)
        .setURL(answer.permalink)
        .setColor(`0x2F3136`)
        .addField("Definition" , trim(answer.definition))
        .addField("Example", trim(answer.example))
        .setFooter(`👍 ${answer.thumbs_up} 👎 ${answer.thumbs_down}`)
        .setTimestamp()

        interaction.followUp({ embeds: [embed] })
    }
}

function trim(input) {
    return input.length > 1024 ? `${input.slice(0, 1024)} ... ` : input;
}