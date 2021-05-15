const commando = require('discord.js-commando')
const discord = require("discord.js");
const axios = require('axios')
const config = require('../../config.json')

module.exports = class Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            aliases: ['queue'],
            group: 'server',
            memberName: 'queue',
            description: '2b2t Australia Queue Info',
        });
    }

    async run(message) {
        if(message.channel.id === config.bot_ch_id) {
            axios.get(`https://api.2b2t.com.au/v1/queue`)
                .then((result) => {
                    const embed = new discord.MessageEmbed()
                        .setColor('#00f800')
                        .setAuthor(
                            `2b2t Australia`,
                            `https://2b2t.com.au/assets/icon.png`,
                            `https://2b2t.com.au/`
                        )
                        .setTitle(`Queue Stats`)
                        .setDescription(`${message.author}\n\n`)
                        .addFields(
                            {
                                name: "Regular",
                                value: `\`\`\`${result.data.regular}\`\`\``,
                                inline: true
                            },
                            {
                                name: "Priority",
                                value: `\`\`\`${result.data.priority}\`\`\``,
                                inline: true
                            },
                            {
                                name: "Veteran",
                                value: `\`\`\`${result.data.veteran}\`\`\``,
                                inline: true
                            }
                        )
                        .setFooter('do /help on the minecraft server to get a list of commands.')
                    message.channel.send(embed)
                }).catch((error) => {
                console.log(error)
            })
        } else message.delete()
    }
}
