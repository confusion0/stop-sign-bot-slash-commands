const Schema = require("../../models/lockdown");

module.exports = {
    name: 'lockdown-add',
    description: 'Add a lockdown channel!',
    options: [
        {
            name: 'channel',
            description: "The lockdown channel you want to add",
            type: 'CHANNEL',
            required: true
        }
    ],
    cooldown: 5000,
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
    
        if(data && 25 <= data.Lockdown.Channels.length) return interaction.editReply({ content: `${client.emotes.error} You already have 25 or more channels in the lockdown data.` })
    
        if(!data) {
            await new Schema({
                Guild: interaction.guild.id,
                Lockdown: {
                    Enabled: false,
                    Channels: channel.id,
                }
            }).save();

            const data = await Schema.findOne({
                Guild: interaction.guild.id,
            });
    
            interaction.followUp({ content: `${client.emotes.success} Successfully saved all channels to lock when lockdown command is run! There are ${data.Lockdown.Channels.length} channels.` });
        } else if(data) {
        
            if(data.Lockdown.Channels.includes(channel.id)) return interaction.editReply({ content: `${client.emotes.error} That channel already exist in the database!` })
                
            data.Lockdown.Channels.push(channel.id)	  
                
            await data.save();
            interaction.followUp({ content: `${client.emotes.success} Successfully set all the provided channels to lock when lockdown command is run! There are ${data.Lockdown.Channels.length} lockdown configurated channels.` });
        }
    }
}