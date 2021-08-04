const { MessageEmbed } = require("discord.js")
const unorm = require('unorm');
const limax = require('limax');

module.exports = {
    name: 'audo-decancer',
    run: async(client, message, args) => {
        
    client.on('guildMemberAdd', async member => {

        const { guild } = member

        if(member.bot) return;
        
        const autodc = await client.gData.get(`${guild.id}:autoDecancer`)

      if(autodc) {
        const target = member
    function decancer(text) {
        text = unorm.nfkd(text);
        text = limax(text, {
            replacement: ' ',
            tone: false,
            separateNumbers: false,
            maintainCase: true,
            
        });
        return text;
    }

    var dcuser = guild.members.cache.get(member.id).displayName
    
    var decancered = decancer(dcuser)
    if (decancered === '') {
        decancered = 'decancered nickname'
    }

    
    guild.members.cache.get(member.id).setNickname(`${decancered}`)
    
    
            } 
        })
    }
}
