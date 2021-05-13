const commando = require('discord.js-commando')
const discord = require('discord.js');
const axios = require('axios')
const config = require('../../config.json')

module.exports = class Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'lookup',
            group: 'server',
            memberName: 'lookup',
            argsType: 'multiple',
            description: 'Lookup players profile',
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

                            const player_kills = result.data.info.player_kill_count
                            const deaths = result.data.info.death_count
                            const first_join = result.data.info.registered
                            const last_seen = result.data.info.last_seen
                            const total_sessions = result.data.info.session_count
                            const playtime = result.data.info.playtime
                            const longest_session = result.data.info.longest_session_length
                            const kick_count = result.data.info.kick_count

                            const embed = new discord.MessageEmbed()
                                .setColor('#00f800')
                                .setTitle(`${username}'s Data`)
                                .setAuthor(
                                    `${username}`,
                                    `${avatar}`,
                                    `https://namemc.com/search?q=${uuid}`
                                )
                                .setThumbnail(`${avatar}`)
                                .addFields(
                                    {
                                        name: "Kills",
                                        value: `${player_kills}`,
                                        inline: true
                                    },
                                    {
                                        name: "Deaths",
                                        value: `${deaths}`,
                                        inline: true
                                    },
                                    {
                                        name: "KDR",
                                        value: `${(player_kills / deaths).toFixed(2)}`,
                                        inline: true
                                    },
                                    {
                                        name: "First Joined",
                                        value: `${first_join}`,
                                        inline: true
                                    },
                                    {
                                        name: "Last Seen",
                                        value: `${last_seen}`,
                                        inline: true
                                    },
                                    {
                                        name: "Total Playtime",
                                        value: `${playtime}`,
                                        inline: true
                                    },
                                    {
                                        name: "Total Sessions",
                                        value: `${total_sessions}`,
                                        inline: true
                                    },
                                    {
                                        name: "Longest Session",
                                        value: `${longest_session}`,
                                        inline: true
                                    },
                                    {
                                        name: "Kick Count",
                                        value: `${kick_count}`,
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

            function sendError(channel, string) {
                const embed = new discord.MessageEmbed()
                    .setColor('#00f800')
                    .setDescription(
                        `${message.author}` + `\n\n` +
                        `**error:** could not find any player by the name \"${string}\"` + '\n' +
                        `**tip:** change your discord nickname to Minecraft IGN`
                    )
                    .setFooter(`usage: ${config.prefix}lookup  username|uuid`)
                channel.send(embed)
            }
        }
    }
}
