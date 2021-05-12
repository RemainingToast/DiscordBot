const commando = require('discord.js-commando')
const discord = require('discord.js');
const axios = require('axios')
const config = require('../../config.json')
const parse = require('parse-duration')
const prettyms = require("pretty-ms");

module.exports = class Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'playtime',
            aliases: ['pt'],
            group: 'server',
            memberName: 'playtime',
            argsType: 'multiple',
            description: 'Retrieve players playtime',
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

                        const playtime = result.data.info.playtime
                        const active_pt = result.data.info.active_playtime
                        const afk_time = result.data.info.afk_time

                        const embed = new discord.MessageEmbed()
                            .setColor('#00f800')
                            .setTitle(`${username}'s Playtime`)
                            .setAuthor(
                                `${username}`,
                                `${avatar}`,
                                `https://namemc.com/search?q=${uuid}`
                            )
                            .setThumbnail(`${avatar}`)
                            .addFields(
                                {
                                    name: "Total",
                                    value: `${playtime}`,
                                    inline: true
                                },
                                {
                                    name: "Active",
                                    value: `${active_pt}`,
                                    inline: true
                                },
                                {
                                    name: "AFK",
                                    value: `${afk_time}`,
                                    inline: true
                                }
                            ).setFooter(`do ${config.prefix}help for more commands`)

                        console.log(parse(active_pt, 'ms'))
                        console.log(prettyms(parse(active_pt, 'ms'), {
                            verbose: true
                        }))
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
                .setFooter(`usage: ${config.prefix}playtime username|uuid`)
            channel.send(embed)
        }
    }
}