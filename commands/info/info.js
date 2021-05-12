const commando = require('discord.js-commando')
const discord = require("discord.js");
const prettyms = require("pretty-ms");

module.exports = class Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'serverinfo',
            aliases: ['info'],
            group: 'info',
            memberName: 'serverinfo',
            description: 'Discord Server Information',
        });
    }

    async run(message) {
        const embed = new discord.MessageEmbed()
            .setColor('#00f800')
            .setDescription(`${message.author}\n\n`)
            .addFields(
                {
                    name: "Member Count",
                    value: `${message.guild.memberCount}`,
                    inline: true
                },
                {
                    name: "Bot Prefix",
                    value: `${this.client.commandPrefix}`,
                    inline: true
                },
                {
                    name: "Bot Uptime",
                    value: `${prettyms(this.client.uptime, {
                        verbose: true
                    })}`,
                    inline: true
                }
            ).setFooter('bot created by RemainingToast#3835')

        await message.channel.send(embed)
    }
}
