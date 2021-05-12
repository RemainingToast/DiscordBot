const commando = require('discord.js-commando')
const discord = require("discord.js");

module.exports = class Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'vote',
            group: 'info',
            memberName: 'vote',
            description: 'Voting links',
        });
    }

    async run(message) {
        const prefix = this.client.commandPrefix;

        const embed = new discord.MessageEmbed()
            .setColor('#00f800')
            .setDescription(`${message.author}` + `\n\n` +
                `Support the server for free by voting on the following websites` + `\n\n` +
                `**1.** https://namemc.com/server/2b2t.com.au *(One Time)*` + `\n` +
                `**2.** https://anarchyservers.org/server/2b2t.com.au *(24 Hours)*` + `\n` +
                `**3.** https://minecraft-mp.com/server/277659/vote/ *(24 Hours)*` + `\n` +
                `**4.** https://topg.org/Minecraft/server-622566 *(24 Hours)*` + `\n`
            ).setFooter(`do ${prefix}help for more commands`)

        await message.channel.send(embed)
    }
}
