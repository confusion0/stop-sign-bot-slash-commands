const Schema = require('../../models/lockdown');
const Discord = require('discord.js');

module.exports = {
    name: 'server',
    description: 'Lockdown or unlockdown the server!',
    options: [
        {
            name: 'options',
            description: "The options to either lockdown or unlockdown the server",
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'Lockdown',
                    value: 'Lockdown'
                },
                {
                    name: 'Unlockdown',
                    value: 'Unlockdown'
                }
            ]
        },
    ],
    cooldown: 60000,
    reqPerm: "ADMINISTRATOR",
    args: "<options> [role]",
    
    /**
     * @param {Client} client
     * @param {CommandInteraction} message
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let [ options ] = args

        const data = await Schema.findOne({
            Guild: interaction.guild.id,
        });

        if(!data) return interaction.editReply({ content: `${client.emotes.error} You do not have any lockdown channel data yet!`})


        if(options === 'Lockdown') {
            if(data.Lockdown.Enabled) return interaction.editReply({ content: `${client.emotes.error} The server is already locked!` })

            data.Lockdown.Enabled = true;

			const channels = interaction.guild.channels.cache.filter(x => data.Lockdown.Channels.includes(x.id));

			channels.forEach((channel) => {
				if(!channel.manageable) return;
				channel.permissionOverwrites.edit(interaction.guild.id, {
					SEND_MESSAGES: false,
				});
		    });

            interaction.followUp({ content: `${client.emotes.success} I have locked up the server!`})
            data.save()
        } else {
            if(!data.Lockdown.Enabled) return interaction.editReply({ content: `${client.emotes.error} The server is already unlockded!` })

            data.Lockdown.Enabled = false;
		    const channels = interaction.guild.channels.cache.filter(x => data.Lockdown.Channels.includes(x.id));

		    channels.forEach((channel) => {
			    if(!channel.manageable) return;
			    channel.permissionOverwrites.edit(interaction.guild.id, {
				    SEND_MESSAGES: true,
				});
			});

            interaction.followUp({ content: `${client.emotes.success} I have unlocked the server!`})
            data.save()
        }
    }
}