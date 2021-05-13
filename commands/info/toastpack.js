const commando = require('discord.js-commando')
const discord = require("discord.js");
const config = require('../../config.json')

module.exports = class Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'toastpack',
            aliases: ['pack', 'texturepack', 'faxpax'],
            group: 'info',
            memberName: 'toastpack',
            description: 'ToastPack link',
        });
    }

    async run(message) {
        if(message.channel.id === config.bot_ch_id) {
            const embed = new discord.MessageEmbed()
                .setColor('#00f800')
                .setDescription(`${message.author}` + `\n\n` +
                    `Best 1.12.2 resource pack 10/10 ign` + `\n\n` +
                    `**faxhax toasted edition:** https://github.com/RemainingToast/ToastPack`
                ).setFooter(`do ${config.prefix}help for more commands`)

            await message.channel.send(embed)
        }
    }
}
