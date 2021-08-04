const Schema = require('../models/lockdown'); 

module.exports = {
    name: 'deletions',
    run: async (client) => {

    client.on('channelDelete', async function(channel) {
        const { guild } = channel

        const lockdownchanneldata = await Schema.findOne({
            Guild: guild.id,
        });
        const aichannel = await client.gData.get(`${guild.id}:altIdentifierChannel`)

        if(aichannel && channel.id == aichannel) {
            client.gData.delete(`${guild.id}:altIdentifierChannel`)
            client.gData.delete(`${guild.id}:altIdentifierTime`)
        }
        if(lockdownchanneldata?.Lockdown.Channels.includes(channel.id)) {
            if(lockdownchanneldata.Lockdown.Channels.length == 1) {

                Schema.findOne({ Guild: guild.id }, async(err, data) => {
                    if(data) {
                        await Schema.findOneAndDelete({ Guild: guild.id }, data);
                    }
                })
            }
      
            const filtered = lockdownchanneldata.Lockdown.Channels.filter((target) => target !== channel.id);
            const enabled = lockdownchanneldata.Lockdown.Enabled
              
            await Schema.findOneAndUpdate({
                Guild: guild.id,
                Lockdown: {
                  Enabled: enabled,
                  Channels: filtered,
                }
            })
        }
    })

    client.on("roleDelete", async function (role) {
        const { guild } = role

        const grole = await client.gData.get(`${guild.id}:giveawayRole`)
              
        if(grole && role.id == grole) {
            client.gData.delete(`${guild.id}:giveawayRole`)
            }
        })
    }
}