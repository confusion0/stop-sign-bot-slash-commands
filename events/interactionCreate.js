const client = require('../index')
const Discord = require('discord.js')
const command_cooldowns = new Map()

client.on('interactionCreate', async (interaction) => {
    if(interaction.isCommand()) {
        await interaction.defer({ ephemeral: true }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if(!cmd) return interaction.followUp({ content: 'An error has occured'});

        if(!interaction.guild) return

        //Permission requirement
        if(cmd.reqPerm == "BOT_ADMIN" && !client.ADMINS.find(admin => admin.ID === interaction.user.id)) return interaction.editReply("This command is reserved for bot admins only.")
  
        if(cmd.reqPerm != "BOT_ADMIN" && cmd.reqPerm != "NONE" && !interaction.member.permissions.has(cmd.reqPerm)) {
          if(!client.ADMINS.find(admin => admin.ID === interaction.user.id)) return interaction.editReply(`You need \`${cmd.reqPerm}\` permmision to run this command.`)
          else interaction.editReply(`Bot admin detected, bypassed \`${cmd.reqPerm}\` permmisions for ${interaction.user.username}`)
        }

        //Cooldowns
        if(cmd.cooldown) {
            if(command_cooldowns.get(`${interaction.user.id}:${interaction.commandName}`)) { 
                const embed = new Discord.MessageEmbed()
                .setTitle('Cooldown Alert')
                .setDescription(`The \`${interaction.commandName}\` command has a \`${cmd.cooldown/1000}s\` cooldown. You still have to wait \`${command_cooldowns.get(`${interaction.user.id}:${interaction.commandName}`)/1000}s\` until you can run the command again.`)
                .setColor('0x2F3136')

                return interaction.followUp({ embeds: [embed], ephemeral: true })
            } else {
              var cooldown = cmd.cooldown
              command_cooldowns.set(`${interaction.user.id}:${interaction.commandName}`, cooldown)
  
              var interval = setInterval(function(){
                command_cooldowns.set(`${interaction.user.id}:${interaction.commandName}`, cooldown)
                cooldown -= 100
              }, 100)
  
              setTimeout(function(){
                clearInterval(interval)
                command_cooldowns.delete(`${interaction.user.id}:${interaction.commandName}`)
              }, cmd.cooldown)
            }
        }

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        cmd.run(client, interaction, args);
    }
});
