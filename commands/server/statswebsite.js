const commando = require('discord.js-commando')
const discord = require("discord.js")
const config = require('../../config.json')

module.exports = class Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'statswebsite',
            group: 'server',
            memberName: 'statswebsite',
            description: 'Stats Website',
        });
    }

    async run(message) {
        if(message.channel.id === config.bot_ch_id) {
            const embed = new discord.MessageEmbed()
                .setColor('#00f800')
                .setDescription(`${message.author}` + `\n\n` +
                    `You can find more in depth player/server analytics on the stat website!` + `\n\n` +
                    `**stats website:** https://stats.2b2t.com.au`
                ).setFooter(`do ${config.prefix}help for more commands`)

            await message.channel.send(embed)
        } else message.delete()
    }
}
