const commando = require('discord.js-commando')
const discord = require("discord.js");
const config = require('../../config.json')

module.exports = class Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'dupe',
            group: 'info',
            memberName: 'dupe',
            description: 'Duplication tutorial link',
        });
    }

    async run(message) {
        if(message.channel.id === config.bot_ch_id) {
            const embed = new discord.MessageEmbed()
                .setColor('#00f800')
                .setDescription(`${message.author}` + `\n\n` +
                    `Current working and public dupe method` + `\n\n` +
                    `**how to dupe (for specks):** https://www.youtube.com/watch?v=n-fN6txZNgc`
                ).setFooter(`do ${config.prefix}help for more commands`)

            await message.channel.send(embed)
        }
    }
}
