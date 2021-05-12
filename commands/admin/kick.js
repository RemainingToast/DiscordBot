const commando = require('discord.js-commando')
const discord = require("discord.js");

module.exports = class Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            group: 'admin',
            memberName: 'kick',
            description: 'Kick a discord member',
            clientPermissions: [
                'KICK_MEMBERS'
            ],
            userPermissions: [
                'KICK_MEMBERS'
            ]
        });
    }

    async run (message) {
        const target = message.mentions.users.first()

        if(!target) {
            await message.channel.send('Please specify an user to kick!')
            return
        }

        const { guild } = message

        const member = guild.members.cache.get(target.id)

        if(member.kickable) {
            const embed = new discord.MessageEmbed()
                .setDescription(`${message.author}\n\n${member} has been kicked`)
                .setColor('#00f800')
            await member.kick()
            await message.channel.send(embed)
        } else {
            const embed = new discord.MessageEmbed()
                .setDescription(`${message.author}\n\n${member} was unable to be kicked`)
                .setColor('#00f800')
            await message.channel.send(embed)
        }
    }
}