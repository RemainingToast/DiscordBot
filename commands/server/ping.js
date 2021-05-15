const commando = require('discord.js-commando')
const discord = require('discord.js');
const axios = require('axios')
const config = require('../../config.json')

module.exports = class Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            group: 'server',
            memberName: 'ping',
            argsType: 'multiple',
            description: 'Retrieve players ping',
        });
    }

    async run(message, args) {

        if(message.channel.id === config.bot_ch_id) {

            let member = message.guild.member(message.author);
            let nickname = member ? member.displayName : null;

            let string

            if (args[0] == null)
                string = nickname
            else
                string = args[0]

            axios.get(`https://playerdb.co/api/player/minecraft/${string}`)
                .then((result1) => {

                    const username = result1.data.data.player.username
                    const uuid = result1.data.data.player.id
                    const avatar = result1.data.data.player.avatar

                    axios.get(`https://stats.2b2t.com.au/v1/player?player=${uuid}`)
                        .then((result) => {

                            const average_ping = result.data.info.average_ping
                            const best_ping = result.data.info.best_ping
                            const worst_ping = result.data.info.worst_ping

                            const embed = new discord.MessageEmbed()
                                .setColor('#00f800')
                                .setAuthor(
                                    `${username}`,
                                    `${avatar}`,
                                    `https://namemc.com/search?q=${uuid}`
                                )
                                .setTitle(`${username}'s Ping`)
                                .setThumbnail(`${avatar}`)
                                .setDescription(`${message.author}\n\n`)
                                .addFields(
                                    {
                                        name: "Best",
                                        value: `\`\`\`${best_ping}\`\`\``,
                                        inline: true
                                    },
                                    {
                                        name: "Worst",
                                        value: `\`\`\`${worst_ping}\`\`\``,
                                        inline: true
                                    },
                                    {
                                        name: "Average",
                                        value: `\`\`\`${average_ping}\`\`\``,
                                        inline: true
                                    }
                                )
                                .setFooter('do /help on the minecraft server to get a list of commands.')
                            message.channel.send(embed)

                        }).catch((error) => {
                        sendError(message.channel, args[0])
                    })
                }).catch((error) => {
                sendError(message.channel, args[0])
            })

            function sendError(channel, string) {
                const embed = new discord.MessageEmbed()
                    .setColor('#00f800')
                    .setDescription(
                        `${message.author}` + `\n\n` +
                        `**error:** could not find any player by the name \"${string}\"` + '\n' +
                        `**tip:** change your discord nickname to Minecraft IGN`
                    )
                    .setFooter(`usage: ${config.prefix}ping username|uuid`)
                channel.send(embed)
            }
        } else message.delete()
    }
}
