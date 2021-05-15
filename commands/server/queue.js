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
            message.channel.startTyping(5);
            axios.get(`https://api.2b2t.com.au/v1/queue`)
                .then((result) => {
                    const embed = new discord.MessageEmbed()
                        .setColor('#00f800')
                        .setAuthor(
                            `2b2t Australia`,
                            `https://2b2t.com.au/assets/icon.png`,
                            `https://2b2t.com.au/`
                        )
                        .setDescription(
                            `${message.author}\n\n**Queue Stats**` +
                            `\`\`\`` +
                            `Regular queue is ${result.data.regular} players long.` + `\n` +
                            `Priority queue is ${result.data.priority} players long.` + `\n` +
                            `Veteran queue is ${result.data.veteran} players long.` + `\n` +
                            `\`\`\``
                        )
                        .setFooter('do /help on the minecraft server to get a list of commands.')
                    message.channel.send(embed)
                    message.channel.startTyping(0);
                }).catch((error) => {
                console.log(error)
            })
        } else message.delete()
    }
}
