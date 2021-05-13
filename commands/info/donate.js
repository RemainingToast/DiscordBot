const commando = require('discord.js-commando')
const discord = require("discord.js");

module.exports = class Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'donate',
            group: 'info',
            memberName: 'donate',
            description: 'Donation link',
        });
    }

    async run(message) {
        const embed = new discord.MessageEmbed()
            .setColor('#00f800')
            .setDescription(
                `${message.author}` + `\n\n` +
                `The Server costs $83 AUD a month. The hardware is an Intel Core i7-7700k CPU, RAM 32GB and 2x HDD SATA 4TB in soft raid. The extra couple dollars goes towards yearly domain cost. That's $85 AUD.` + `\n\n` +
                `**donations:** https://2b2t.com.au/`
            )
            .setFooter('You can be rewarded for donations, more information on the website')

        await message.channel.send(embed)
    }
}
