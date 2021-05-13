const commando = require('discord.js-commando')
const discord = require('discord.js');
const axios = require('axios')
const config = require('../../config.json')
const parse = require("parse-duration");
const prettyms = require("pretty-ms");

module.exports = class Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'joindate',
            aliases: ['jd'],
            group: 'server',
            memberName: 'joindate',
            argsType: 'multiple',
            description: 'Retrieve players joindate',
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

                            const first_join = result.data.info.registered
                            const last_seen = result.data.info.last_seen
                            const activity = result.data.info.activity_index_group

                            const ms = parse(first_join, 'ms');

                            console.log(first_join)
                            console.log(ms)
                            console.log(prettyms(ms, {
                                verbose: true
                            }))
                            console.log(ms >= 43200000)

                            const embed = new discord.MessageEmbed()
                                .setColor('#00f800')
                                .setTitle(`${username}'s Join Date`)
                                .setAuthor(
                                    `${username}`,
                                    `${avatar}`,
                                    `https://namemc.com/search?q=${uuid}`
                                )
                                .setThumbnail(`${avatar}`)
                                .addFields(
                                    {
                                        name: "First Join",
                                        value: `${first_join}`,
                                        inline: true
                                    },
                                    {
                                        name: "Last Seen",
                                        value: `${last_seen}`,
                                        inline: true
                                    },
                                    {
                                        name: "Activity Status",
                                        value: `${activity}`,
                                        inline: true
                                    }
                                ).setFooter(`do ${config.prefix}help for more commands`)

                            message.channel.send(embed)

                        }).catch((error) => {
                        sendError(message.channel, username)
                    })
                }).catch((error) => {
                sendError(message.channel, string)
            })

            function sendError(channel, string) {
                const embed = new discord.MessageEmbed()
                    .setColor('#00f800')
                    .setDescription(
                        `${message.author}` + `\n\n` +
                        `**error:** could not find any stats for player \"${string}\"` + '\n' +
                        `**tip:** change your discord nickname to Minecraft IGN`
                    )
                    .setFooter(`usage: ${config.prefix}joindate username|uuid`)
                channel.send(embed)
            }
        }
    }
}
