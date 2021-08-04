
const fs = require('fs').promises
const { MessageCollector, MessageEmbed, Collector } = require('discord.js')
const axios = require('axios')
const url = 'https://api.no-api-key.com/api/v2/captcha'

module.exports = {
    name: 'verification',
    run: async(client) => {
      client.on('guildMemberAdd', async (member) => {
        if(member.user.bot) return
        const { guild } = member
        const verification = await client.gData.get(`${guild.id}:verification`)
        if (verification) {
          const { data } = await axios.get(url)

          const message = await member.send({ embeds: [
            new MessageEmbed()
            .setTitle('Verification')
            .setDescription(`You have 1 minute to solve the captcha and enter it below. Type cancel to cancel. If you fail or cancel the captcha, you will be kicked.`)
            .setColor('0x2F3136')
            .setImage(data.captcha)
            .setTimestamp()
            .setFooter(member.user.tag)
            ]
          })

          

          const filter = (m) => m.author.id === member.id
          let collector = new MessageCollector(member.user.dmChannel, filter, { time: 60000, max: 1 })
          collector.on("collect", async (msg) => {

          if(!msg){
            collector.stop()
            message.edit({ embeds: [
              new MessageEmbed()
              .setTitle('Verification')
              .setDescription(`You took too long to respond, captcha failed. You have been kicked`)
              .setColor('RED')
              .setImage(data.captcha)
              .setTimestamp()
              .setFooter(member.user.tag)
              ]
            })
            collector.stop()
            member.kick()
          } else {
            if(msg.content.toLowerCase() == 'cancel'){
              collector.stop()
              message.edit({ embeds: [
                new MessageEmbed()
                .setTitle('Verification')
                .setDescription(`You cancelled the captcha, captcha failed. You have been kicked`)
                .setColor('RED')
                .setImage(data.captcha)
                .setTimestamp()
                .setFooter(member.user.tag)
                ]
              })
              member.kick()
            } else if(msg.content == data.captcha_text) {
              collector.stop()
              message.edit({ embeds: [
                new MessageEmbed()
                .setTitle('Verification')
                .setDescription(`You completed the captcha successfully!`)
                .addField('Correct Answer: ', data.captcha_text)
                .addField('Your Answer: ', msg.content)
                .setColor('GREEN')
                .setImage(data.captcha)
                .setTimestamp()
                .setFooter(member.user.tag)
                ]
              }) 
            } else {
              collector.stop()
              message.edit({ embeds: [
                new MessageEmbed()
                .setTitle('Verification')
                .setDescription(`You entered the wrong answer. You have been kicked`)
                .addField('Correct Answer: ', data.captcha_text)
                .addField('Your Answer: ', msg.content)
                .setColor('RED')
                .setImage(data.captcha)
                .setTimestamp()
                .setFooter(member.user.tag)
                ]
              })
              member.kick()
            }
          }
        })
      }
    })
  }
}

