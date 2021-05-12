const commando = require('discord.js-commando')
const discord = require("discord.js");
const config = require('../../config.json')

module.exports = class Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'namemc',
            group: 'info',
            memberName: 'namemc',
            description: 'Namemc link',
        });
    }

    async run(message) {
        const embed = new discord.MessageEmbed()
            .setColor('#00f800')
            .setDescription(`${message.author}` + `\n\n` +
                `Support the server for free by liking the server on namemc (one time)` +  `\n\n` +
                `**namemc:** https://namemc.com/server/2b2t.com.au`
            ).setFooter(`do ${config.prefix}help for more commands`)

        await message.channel.send(embed)
    }
}
