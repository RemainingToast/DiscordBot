const commando = require('discord.js-commando')
const discord = require("discord.js");
const axios = require('axios')

module.exports = class Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'status',
            aliases: ['uptime'],
            group: 'server',
            memberName: 'status',
            description: '2b2t Australia Status',
        });
    }

    async run(message) {
        axios.get(`http://139.99.210.123:8080/v1/serverOverview?server=2b2t%20Australia`)
            .then((result) => {

                const players = String(result.data.numbers.online_players)
                const averageTps = String(result.data.last_7_days.average_tps)
                const downTime = String(result.data.last_7_days.downtime)

                const embed = new discord.MessageEmbed()
                    .setColor('#00f800')
                    .setDescription(`${message.author}\n\n`)
                    .addFields(
                        {
                            name: "Players",
                            value: `${players}/150`,
                            inline: true
                        },
                        {
                            name: "Average TPS (Last 7 Days)",
                            value: `${averageTps}`,
                            inline: true
                        },
                        {
                            name: "Downtime (Last 7 Days)",
                            value: `${downTime}`,
                            inline: true
                        }
                    ).setFooter('do /help on the minecraft server to get a list of commands.')

                message.channel.send(embed)
            }).catch((error) => { console.log(error) })
    }
}
