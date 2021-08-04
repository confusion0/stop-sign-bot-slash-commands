const ms = require('ms')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'altidentifier',
    run: async(client) => {
        client.on('guildMemberAdd', async (member) => {
            const { guild } = member
            if(!guild) return
            if(member.user.bot) return
            const aichannel = guild.channels.cache.get(await client.gData.get(`${guild.id}:altIdentifierChannel`))
            const aitime = await client.gData.get(`${guild.id}:altIdentifierTime`)
            if(!aichannel) return
            const createdAt = new Date(member.user.createdAt).getTime();
            const difference = Date.now() - createdAt;

            if(difference < ms(aitime)) {
                member.send({ content: `This server is protected by an alt identifier. You have been kicked because you have been identified as an alt or your because your account is too new. Join back when your account is over ${ms(ms(aitime), {long: true})}` })
                member.kick()

                const embed = new MessageEmbed()
                .setTitle('Alt account identified')
                .setColor('RED')
                .setDescription(`${member} has been identified as an alt. ID: ${member.id}`)
                .addField('Account creation date', member.user.createdAt.toString().slice(0, 15))
                .addField('Account age', ms(Math.abs(new Date() - member.user.createdAt), {long: true}))
                .addField('Minimum required account age', ms(ms(aitime), {long: true}))
                .setTimestamp()

                aichannel.send({ embeds: [embed] })
            } else {
                
                const embed2 = new MessageEmbed()
                .setTitle('Alt identification passed')
                .setColor('GREEN')
                .setDescription(`${member} has passed the identification process. ID: ${member.id}`)
                .addField('Account creation date', member.user.createdAt.toString().slice(0, 15))
                .addField('Account age', ms(Math.abs(new Date() - member.user.createdAt), {long: true}))
                .addField('Minimum required account age', ms(ms(aitime), {long: true}))

                aichannel.send({ embeds: [embed2] })
            }
        })
    }
}