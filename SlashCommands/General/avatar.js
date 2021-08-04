const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'avatar',
    description: 'Displays the avatar of a user!',
    options: [
        {
          name: 'format',
          description: "The format for the avatar to display in!",
          type: 'STRING',
          required: true,
          choices: [
            {
              name: 'PNG',
              value: "png"
            },
            {
              name: 'GIF',
              value: "gif"
            },
            {
              name: 'JPG',
              value: "jpg"
            },
            {
              name: 'WEBP',
              value: "webp"
            }
          ]
        },
        {
          name: 'user',
          description: "The user that you want to display the avatar of",
          type: 'USER',
          required: false
        }
    ],
    cooldown: 5000,
    reqPerm: "NONE",
    args: "<format> [user]",

    /**
     * @param {Client} client
     * @param {CommandInteraction} message
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const [ format, member ] = args

        const guildmember =  interaction.guild.members.cache.get(member) || interaction.member
        const embed = new MessageEmbed()
          .setColor('0x2F3136')
          .setTitle(`${guildmember.user.username}'s Avatar`)
          .setDescription(
            `[Avatar Link](${guildmember.user.displayAvatarURL({
              size: 2048,
              dynamic: true,
              format: format,
            })})`
          )
          .setImage(guildmember.user.avatarURL({ size: 2048, dynamic: true, format: format }));
    
          interaction.editReply({ embeds: [embed] });
    }
}