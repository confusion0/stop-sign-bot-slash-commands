const { Util } = require("discord.js")
const Schema = require('../../models/reactionroles')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'reaction-role-panel',
    description: 'Displays the reaction roles!',
    options: [
        {
            name: 'channel',
            description: "The channel you want to send the reaction role panel to",
            type: 'CHANNEL',
            required: true
        }
    ],
    cooldown: 15000,
    reqPerm: "ADMINISTRATOR",
    args: "",
    
    /**
     * @param {Client} client
     * @param {CommandInteraction} message
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let [ reactionRoleChannel ] = args

        let channel = interaction.guild.channels.cache.get(reactionRoleChannel)

        if(channel.type == "GUILD_VOICE") {
            return interaction.editReply({ content: `${client.emotes.error} Please choose a text channel!` })
        }

        try {
            Schema.findOne({ Guild: interaction.guild.id }, async(err, data) => {
                if(!data) return interaction.editReply({ content: `${client.emotes.error} There are no reaction roles yet. Use the \`reaction-role-add\` command to add some reaction roles.` })
                const mapped = Object.keys(data.Roles)
                .map((value, index) => {
                    const role = interaction.guild.roles.cache.get(data.Roles[value][0])
    
                    return `${index + 1}) React to ${data.Roles[value][1].raw} for ${role}!`;
                }).join("\n\n");

                const embed = new MessageEmbed().setTitle('Reaction roles').setColor("0x2F3136").setDescription(mapped)
    
                channel.send({ embeds: [embed] })
                .then((msg) => {
                    data.Message = msg.id
                    data.save()
    
                    const reactions = Object.values(data.Roles).map((val) => val[1].id ?? val[1].raw)
                    
                    reactions.map((emoji) => msg.react(emoji));
                })
            })
        } catch(error) {
            interaction.followUp({ content: `${client.emotes.error} An error occured while runnning this command! ERROR: \`\`\`${error}\`\`\`` })
        }
    }
}
