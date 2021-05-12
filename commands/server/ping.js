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

        let member = message.guild.member(message.author);
        let nickname = member ? member.displayName : null;

        let string

        if(args[0] == null)
            string = nickname
        else
            string = args[0]

        axios.get(`https://playerdb.co/api/player/minecraft/${string}`)
            .then((result1) => {

                const username = result1.data.data.player.username
                const uuid = result1.data.data.player.id
                const avatar = result1.data.data.player.avatar

                axios.get(`http://139.99.210.123:8080/v1/player?player=${uuid}`)
                    .then((result) => {

                        const average_ping = result.data.info.average_ping
                        const best_ping = result.data.info.best_ping
                        const worst_ping = result.data.info.worst_ping

                        const embed = new discord.MessageEmbed()
                            .setColor('#00f800')
                            .setTitle(`${username}'s Ping`)
                            .setAuthor(
                                `${username}`,
                                `${avatar}`,
                                `https://namemc.com/search?q=${uuid}`
                            )
                            .setThumbnail(`${avatar}`)
                            .setDescription(`*Results will be \"Unavailable\" if player hasn\'t connected recently*`)
                            .addFields(
                                {
                                    name: "Average",
                                    value: `${average_ping}`,
                                    inline: true
                                },
                                {
                                    name: "Best",
                                    value: `${best_ping}`,
                                    inline: true
                                },
                                {
                                    name: "Worst",
                                    value: `${worst_ping}`,
                                    inline: true
                                }
                            ).setFooter(`do ${config.prefix}help for more commands`)

                        message.channel.send(embed)

                    }).catch((error) => {
                    sendError(message.channel, args[0])
                })
            }).catch((error) => {
            sendError(message.channel, args[0])
        })

        function sendError(channel, string){
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
    }
}
