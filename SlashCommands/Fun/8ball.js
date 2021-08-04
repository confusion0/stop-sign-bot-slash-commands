const { MessageEmbed } = require('discord.js')

module.exports = {
    name: '8ball',
    description: 'Ask the magic 8ball a question!',
    options: [
        {
            name: 'question',
            description: "The question that you want to ask the magic 8ball",
            type: 'STRING',
            required: true
        }
    ],
    cooldown: 5000,
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
        
        let replies = [
            "I think so",
            "Yes",
            "I guess",
            "Yeah absolutely",
            "Maybe",
            "Possibly",
            "No",
            "Most likely",
            "No Way!",
            "I dont know",
            "Without a doubt",
            "Indeed",
            "For sure",
        ];
      
        let result = Math.floor(Math.random() * replies.length);
        
        const embed = new MessageEmbed()
        .setColor('0x2F3136')
        .setTitle('🎱 **Magic 8ball** ✨')
        .addField('Your question...', question)
        .addField('The 8ball\'s answer...', replies[result])
          
        interaction.followUp({
            embeds: [embed]
        })
    }
}