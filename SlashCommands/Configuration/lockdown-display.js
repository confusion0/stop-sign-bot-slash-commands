const Schema = require("../../models/lockdown");
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'lockdown-display',
    description: 'Display the lockdown channels!',
    cooldown: 10000,
    reqPerm: "ADMINISTRATOR",
    args: "",
    
    /**
     * @param {Client} client
     * @param {CommandInteraction} message
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const data = await Schema.findOne({
            Guild: interaction.guild.id,
        });
  
        if(!data) return interaction.editReply({ content: `${client.emotes.error} There is no lockdown channel data to be displayed!` })
  
        var channels = ""
        data.Lockdown.Channels.forEach(channel => {
            channels += ( "<#" + channel + ">, ")
        })

        channels.substring(0, channels.length-2)
  
         
        const embed = new MessageEmbed()
        .setTitle('Lockdown channels')
        .setDescription(channels)
        .setColor('0x2F3136')

        interaction.followUp({ embeds: [embed] })
    }
}