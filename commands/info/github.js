const commando = require('discord.js-commando')
const discord = require("discord.js")
const config = require('../../config.json')

module.exports = class Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'github',
            group: 'info',
            memberName: 'github',
            description: 'GitHub link',
        });
    }

    async run(message) {
        if(message.channel.id === config.bot_ch_id) {
            const embed = new discord.MessageEmbed()
                .setColor('#00f800')
                .setDescription(`${message.author}` + `\n\n` +
                    `Check out the github organisation!` + `\n\n` +
                    `**github:** https://github.com/2b2tau/`
                ).setFooter(`do ${config.prefix}help for more commands`)

            await message.channel.send(embed)
        } else message.delete()
    }
}
