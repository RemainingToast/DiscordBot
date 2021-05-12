const commando = require('discord.js-commando')
const discord = require("discord.js");

module.exports = class Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'embed',
            group: 'admin',
            memberName: 'embed',
            description: 'Discord information embed',
            clientPermissions: [
                'ADMINISTRATOR'
            ],
            userPermissions: [
                'ADMINISTRATOR'
            ]
        });
    }

    async run(message) {
        const embed = new discord.MessageEmbed()
            .setTitle('2b2t Australia')
            .setURL('https://www.2b2t.com.au')
            .setColor('#00f800')
            .setDescription(
                '2b2t Australia is an alternative to the popular Minecraft server 2b2t. ' + '\n' +
                'The server is hosted in Australia and has **NO RULES**' + '\n\n' +
                '**Server Links:**' + '\n' +
                'If you wish to donate please visit https://www.2b2t.com.au/' + '\n' +
                'Permanent Discord Invite: https://discord.gg/fvSKpbtQAV' + '\n' +
                'Subreddit: https://www.reddit.com/r/2b2tAU/' + '\n' +
                'Like on Namemc: https://namemc.com/server/2b2t.com.au' + '\n\n**Server Info:**'
            )
            .addFields(
                {
                    name: "IP",
                    value: "2b2t.com.au",
                    inline: true
                },
                {
                    name: "Version",
                    value: "1.12.2",
                    inline: true
                },
                {
                    name: "Host Location",
                    value: "Sydney, Australia",
                    inline: true
                }
            ).setFooter('Do /help on the minecraft server to get a list of commands.')

        await message.channel.send(embed)
        console.log('[INFO] Executed command',message.content)
    }
}
