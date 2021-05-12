const commando = require('discord.js-commando')
const discord = require('discord.js');
const axios = require('axios')
const config = require('../../config.json')
const parse = require('parse-duration')
const prettyms = require("pretty-ms");

module.exports = class Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'vetcheck',
            aliases: ['vc'],
            group: 'server',
            memberName: 'vetcheck',
            argsType: 'multiple',
            description: 'Retrieve players vet queue status',
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

                        const active_pt = result.data.info.active_playtime
                        const ms = parse(active_pt, 'ms');

                        const embed = new discord.MessageEmbed()
                            .setColor('#00f800')
                            .setTitle(`${username}'s Vet Queue Status`)
                            .setDescription(`${message.author}` + `\n\n` + `${username} has enough playtime (${ms >= 43200000})`)
                            .setAuthor(
                                `${username}`,
                                `${avatar}`,
                                `https://namemc.com/search?q=${uuid}`
                            )
                            .setThumbnail(`${avatar}`)
                            .setFooter(`do ${config.prefix}help for more commands`)

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
                .setFooter(`usage: ${config.prefix}vetcheck username|uuid`)
            channel.send(embed)
        }
    }
}
