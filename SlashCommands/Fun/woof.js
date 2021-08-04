const { MessageEmbed } = require('discord.js')
const nekoClient = require('nekos.life');
let neko = new nekoClient();

module.exports = {
    name: 'woof',
    description: 'Shows a random image of a dog!',
    cooldown: 5000,
    reqPerm: "NONE",
    args: "",
    
    /**
     * @param {Client} client
     * @param {CommandInteraction} message
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        let img = (await neko.sfw.woof()).url;

        const embed = new MessageEmbed()
        .setColor('0x2F3136')
        .setImage(img)

        interaction.followUp({ embeds: [embed] })
    }
}