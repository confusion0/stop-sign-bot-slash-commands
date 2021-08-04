const Schema = require("../models/reactionroles")

module.exports = {
    name: 'reaction-roles',
    run: async(client) => {

        client.on('messageReactionAdd', async(reaction, user) =>  {
            const { guild } = reaction.message

            if(!guild) return
            if(user.bot) return;
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            
            Schema.findOne({ Message: reaction.message.id }, async(err, data) => {
                if(!data) return;
                if(!Object.keys(data.Roles).includes(reaction.emoji.name)) return

                const [ roleid ] = data.Roles[reaction.emoji.name];

                if(!roleid) return

                if(!reaction.message.guild.roles.cache.find((r) => r.id === roleid)) return

                if(reaction.message.guild.me.roles.highest.position <= reaction.message.guild.roles.cache.find(r => r.id === roleid).position) return

                reaction.message.guild.members.cache.get(user.id).roles.add(roleid);
            })
        })

        client.on('messageReactionRemove', async(reaction, user) =>  {
            const { guild } = reaction.message

            if(!guild) return
            if(user.bot) return;
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            
            Schema.findOne({ Message: reaction.message.id }, async(err, data) => {
                if(!data) return;
                if(!Object.keys(data.Roles).includes(reaction.emoji.name)) return

                const [ roleid ] = data.Roles[reaction.emoji.name];

                if(!roleid) return

                if(!reaction.message.guild.roles.cache.find((r) => r.id === roleid)) return

                if(reaction.message.guild.me.roles.highest.position <= reaction.message.guild.roles.cache.find(r => r.id === roleid).position) return

                reaction.message.guild.members.cache.get(user.id).roles.remove(roleid);
            })
        })
    }
}