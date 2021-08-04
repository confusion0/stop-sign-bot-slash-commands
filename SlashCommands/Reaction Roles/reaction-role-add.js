const { Util } = require("discord.js")
const Schema = require('../../models/reactionroles')

module.exports = {
    name: 'reaction-role-add',
    description: 'Add a reaction role!',
    options: [
        {
            name: 'role',
            description: "The role for the reaction role",
            type: 'ROLE',
            required: true,
        },
        {
            name: 'emoji',
            description: "The emoji for the reaction role",
            type: 'STRING',
            required: true
        }
    ],
    cooldown: 15000,
    reqPerm: "ADMINISTRATOR",
    args: "<role> <emoji>",
    
    /**
     * @param {Client} client
     * @param {CommandInteraction} message
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let [ reactionRole, emoji ] = args 

        let role = interaction.guild.roles.cache.get(reactionRole)

        const parsedEmoji = Util.parseEmoji(emoji)

        if(!parsedEmoji) return interaction.editReply({ content: `${client.emotes.error} That is not a valid emoji!` })

        Schema.findOne({ Guild: interaction.guild.id }, async(err, data) => {
            if(data) {
                let ids = []
                const mapped = Object.keys(data.Roles)
                .map((value, index) => {
                const role = interaction.guild.roles.cache.get(data.Roles[value][0])

                ids.push(role.id);
                })

                if(10 <= ids.length) return interaction.editReply({ content: `${client.emotes.error} You may only have 10 reaction roles!`})

                data.Roles[parsedEmoji.name] = [
                    role.id,
                    {
                        id: parsedEmoji.id,
                        raw: emoji
                    }
                ]

                await Schema.findOneAndUpdate({ Guild: interaction.guild.id }, data);
            } else {
                
                new Schema({
                    Guild: interaction.guild.id,
                    Message: 0,
                    Roles: {
                        [parsedEmoji.name]: [
                            role.id,
                            {
                                id: parsedEmoji.id,
                                raw: emoji,
                            }
                        ]
                    }
                }).save();
            }

            interaction.followUp({ content: `${client.emotes.add} I have successfully added a reaction role ${role.name} for ${emoji}! Use the slash command called \`reaction-role-panel\` in the channel you want the reaction role to be in!` })
        })
    }
}