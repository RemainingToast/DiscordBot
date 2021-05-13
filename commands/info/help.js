const commando = require('discord.js-commando')
const discord = require("discord.js");
const config = require('../../config.json')

module.exports = class Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'help',
            group: 'info',
            memberName: 'help',
            description: 'help',
        });
    }

    async run(message) {
        if(message.channel.id === config.bot_ch_id) {
            const prefix = this.client.commandPrefix

            const embed = new discord.MessageEmbed()
                .setColor('#00f800')
                .setTitle('Help Command')
                .setDescription(`${message.author}` + `\n\n`
                    + `**Stats Site:** https://stats.2b2t.com.au` + `\n`
                    + `**Purchase Priority/MOTDs:** https://priority.2b2t.com.au`
                )
                .setURL('https://2b2t.com.au')
                .addFields(
                    {
                        name: "SERVER",
                        value: `\`\`\`` + `\n` +
                            `${prefix}status` + `\n` +
                            `${prefix}randommotd` + `\n` +
                            `${prefix}kdr username|uuid` + `\n` +
                            `${prefix}ping username|uuid` + `\n` +
                            `${prefix}lookup username|uuid` + `\n` +
                            `${prefix}joindate username|uuid` + `\n` +
                            `${prefix}playtime username|uuid` + `\n` +
                            `\`\`\``,
                        inline: true
                    },
                    {
                        name: "INFO",
                        value: `\`\`\`` + `\n` +
                            `${prefix}vote` + `\n` +
                            `${prefix}dupe` + `\n` +
                            `${prefix}help` + `\n` +
                            `${prefix}info` + `\n` +
                            `${prefix}donate` + `\n` +
                            `${prefix}namemc` + `\n` +
                            `${prefix}subreddit` + `\n` +
                            `${prefix}toastpack` + `\n` +
                            `\`\`\``,
                        inline: true
                    },
                    {
                        name: "MISC",
                        value: `\`\`\`` + `\n` +
                            `${prefix}meme` + `\n` +
                            `${prefix}darkmeme` + `\n` +
                            `\`\`\``,
                        inline: true
                    }
                ).setFooter('Some commands may have a delayed response when it is fetching from the API')

            await message.channel.send(embed)
        }
    }
}
