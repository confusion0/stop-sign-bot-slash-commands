const Schema = require("../../models/lockdown");

module.exports = {
    name: 'lockdown-remove',
    description: 'Remove a lockdown channel!',
    options: [
        {
            name: 'channel',
            description: "The lockdown channel you want to remove",
            type: 'CHANNEL',
            required: true
        }
    ],
    cooldown: 10000,
    reqPerm: "ADMINISTRATOR",
    args: "<channel>",
    
    /**
     * @param {Client} client
     * @param {CommandInteraction} message
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let [ lockdownChannel ] = args

        let channel = interaction.guild.channels.cache.get(lockdownChannel)

        if(channel.type == "GUILD_VOICE") {
            return interaction.editReply({ content: `${client.emotes.error} Please choose a text channel!` })
        }

        const data = await Schema.findOne({
            Guild: interaction.guild.id,
        });

        if(!data) return interaction.editReply({ content: `${client.emotes.error} There is no lockdown channel data!` })

        if(!data.Lockdown.Channels.includes(channel.id)) return interaction.editReply({ content: `${client.emotes.error} That channel does not exist in the lockdown channel data!` })

        if(data.Lockdown.Channels.length == 1) {

            Schema.findOne({ Guild: interaction.guild.id }, async(err, data) => {
                if(data) {
                    await Schema.findOneAndDelete({ Guild: interaction.guild.id }, data);
                }
            })
        } else {
  
            const filtered = data.Lockdown.Channels.filter((target) => target !== channel.id);
            const enabled = data.Lockdown.Enabled
  
            await Schema.findOneAndUpdate({
                Guild: interaction.guild.id,
                Lockdown: {
                    Enabled: enabled,
                    Channels: filtered,
                }
            })
        }

        return interaction.followUp({ content: `${client.emotes.success} I have successfully deleted the channel from the lockdown channel data!` })
    }
}