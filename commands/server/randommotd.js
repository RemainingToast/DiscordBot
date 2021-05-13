const commando = require('discord.js-commando')
const discord = require("discord.js");
const axios = require('axios')
const config = require('../../config.json')

module.exports = class Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'randommotd',
            aliases: ['motd'],
            group: 'server',
            memberName: 'motd',
            description: 'Get current server motd',
        });
    }

    async run(message) {
        if(message.channel.id === config.bot_ch_id) {
            axios.get(`https://mcapi.xdefcon.com/server/${config.server_ip}/full/json`)
                .then((result) => {

                    const embed = new discord.MessageEmbed()
                        .setColor('#00f800')
                        .setDescription(`${message.author}`)
                        .addFields(
                            {
                                name: "MOTD",
                                value: `${result.data.motd.text}`,
                                inline: true
                            }
                        ).setFooter('You can add your own by donating on https://2b2t.com.au/')

                    message.channel.send(embed)

                }).catch((error) => {
                console.log(error)
            })
        } else message.delete()
    }
}
