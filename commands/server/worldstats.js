const commando = require('discord.js-commando')
const discord = require("discord.js");
const axios = require('axios')
const config = require('../../config.json')

module.exports = class Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'worldstats',
            aliases: ['stats'],
            group: 'server',
            memberName: 'worldstats',
            description: '2b2t Australia World Stats',
        });
    }

    async run(message) {
        if(message.channel.id === config.bot_ch_id) {
            axios.get(`https://api.2b2t.com.au/v1/stats`)
                .then((result) => {
                     const embed = new discord.MessageEmbed()
                        .setColor('#00f800')
                        .setAuthor(
                             `2b2t Australia`,
                             `https://2b2t.com.au/assets/icon.png`,
                             `https://2b2t.com.au/`
                         )
                        .setDescription(
                            `${message.author}\n\n**World Stats:**` +
                            `\`\`\`` +
                            `${result.data.players} player(s) have spawned at least once in the server.` + `\n` +
                            `The Map is ${result.data.years}  years, ${result.data.months}  months and ${result.data.days}  days old and has a file size of ${result.data.size}  GB` + `\n` +
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
