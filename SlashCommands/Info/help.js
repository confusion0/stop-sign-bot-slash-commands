const { MessageActionRow, MessageButton, MessageEmbed, Client } = require('discord.js')

const path = require('path')

module.exports = {
    name: 'help',
    description: 'Sends the help embed!',
    options: [
        {
            name: 'slash-command',
            description: "Get info on a certain slash command",
            type: 'STRING',
            required: false,
        }
    ],
    cooldown: 7500,
    reqPerm: "NONE",
    args: "[slash-command]",

    /**
     * @param {Client} client
     * @param {CommandInteraction} message
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let [ slashCommand ] = args;

        const home = new MessageEmbed()
        .setColor('0x2F3136')
        .setAuthor(interaction.user.username, interaction.user.displayAvatarURL())
        .setTitle('Help panel')
        .setDescription(`\`\`\`- [] = optional argument\n- <> = required argument\nYou can use this slash command to find more info on specific commands!\`\`\``)

        client.slashCommands.forEach(slashCommand => {
            const filepath = client.slashCommandFiles.find(filepath => filepath.includes(slashCommand.name))
            if(!filepath) return

            const module = getModuleFromPath(filepath)
        
            if(module == "developer") return

            var field = home.fields.find(c => c.name === module)
        
            if(!field) {
                home.addField(module, 'NONE')
                field = home.fields.find(field => field.name == module)
            }

            if(field.value == "NONE") field.value = '`'+ slashCommand.name +'`'
            else field.value += `, \`${slashCommand.name}\``
        })

        const button = new MessageActionRow().addComponents(
            new MessageButton()
            .setStyle("LINK")
            .setURL("https://discord.com/api/oauth2/authorize?client_id=869985606640484354&permissions=8&scope=applications.commands%20bot")
            .setLabel("Invite Link"),
            new MessageButton()
            .setStyle("LINK")
            .setURL("https://discord.gg/e4fxq8vCfM")
            .setLabel("Support Server Link")
        )

        if(!slashCommand) {
        interaction.followUp({ embeds: [home], components: [button] })
        } else {
            var command = client.slashCommands.get(slashCommand.toLowerCase())

            if(!command) return interaction.editReply(`${client.emotes.error} I could not find a slash command with that name!`)

            const embed = new MessageEmbed()
            embed.setColor('0x2F3136')
            embed.setTitle(`Slash command Information - ${command.name}`)
            embed.setDescription("```<> means required, and [] means optional```")
            embed.addField("Description: ", `\`\`\`${command.description}\`\`\``)
            if(command.args) embed.addField("Usage: ", `\`\`\`/${command.name} ${command.args}\`\`\``)
            if(command.reqPerm && command.reqPerm != "NONE") embed.addField("Required Permissions: ", `\`\`\`${command.reqPerm}\`\`\``)
            if(command.cooldown) embed.addField('Cooldown: ', `\`\`\`${command.cooldown}\`\`\``)
            
            interaction.followUp({ embeds: [embed], components: [button] })
        }
    }
}

const getModuleFromPath = (filepath) => {
    const splited = filepath.split(path.sep)
    return splited[splited.length-2]
}