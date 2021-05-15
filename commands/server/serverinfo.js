const commando = require('discord.js-commando')
const discord = require("discord.js");
const axios = require('axios')
const config = require('../../config.json')

module.exports = class Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'serverinfo',
            aliases: ['uptime', 'tps'],
            group: 'server',
            memberName: 'serverinfo',
            description: '2b2t Australia Server Info',
        });
    }

    async run(message) {
        if(message.channel.id === config.bot_ch_id) {
            axios.get(`https://api.2b2t.com.au/v1/server`)
                .then((result) => {
                     const embed = new discord.MessageEmbed()
                        .setColor('#00f800')
                        .setAuthor(
                             `2b2t Australia`,
                             `https://2b2t.com.au/assets/icon.png`,
                             `https://2b2t.com.au/`
                         )
                        .setDescription(
                            `${message.author}\n\n**Server Info:**` +
                            `\`\`\`` +
                            `There is currently ${result.data.performance.tps} TPS with ${result.data.online} players online.` + `\n` +
                            `Uptime is ${result.data.uptime}.` + `\n` +
                            `\`\`\``
                        )
                        .setFooter('do /help on the minecraft server to get a list of commands.')
                    message.channel.send(embed)
                }).catch((error) => {
                console.log(error)
            })
        } else message.delete()
    }
}
