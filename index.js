const commando = require('discord.js-commando')
const path = require('path')
const fs = require('fs');

const config = require('./config.json')
const axios = require('axios')
const {TextChannel} = require("discord.js");

const client = new commando.CommandoClient({
    owner: config.owner_id,
    commandPrefix: config.prefix
})

const inviteCache = require('./cache.json');

client.on('ready', () => {
    console.log('[INFO] Bot is ready and starting!')

    // @ts-ignore
    client.registry
        .registerGroups([
            ['admin', 'admin commands'],
            ['info', 'info commands'],
            ['misc', 'misc commands'],
            ['server', 'server commands']
        ])
        .registerCommandsIn(path.join(__dirname, 'commands'))

    console.log('[INFO] Commands registered')

    console.log('[INFO] Scheduling custom status')
    setInterval(() => {
        axios.get(`https://mcapi.xdefcon.com/server/${config.server_ip}/full/json`).then((result) => {
            const status = String(result.data.serverStatus)
            const players = String(result.data.players)

            if (status.startsWith('offline') || status === 'offline') {
                client.user.setPresence({activity: {name: `Server is offline :(`, type: 0}, status: 'dnd'})
            } else {
                client.user.setPresence({activity: {name: `${players} players`, type: "WATCHING"}, status: 'online'})
            }

        }).catch((error) => {
            console.log(error)
        })
    }, 5000)
})

client.on('message', message => {
    if (message.author === client.user) return

    if (message.channel instanceof TextChannel) {
        if (config.ad_channel_id.includes(message.channel.id)) {
            const regex = /(https?:\/\/)?(www.)?(discord.(gg|io|me|li)|discordapp.com\/invite)\/[^\s/]+?(?=\b)/g;
            const content = message.content
            const invite = content.match(/(https?:\/\/)?(www.)?(discord.(gg|io|me|li)|discordapp.com\/invite)\/[^\s/]+?(?=\b)/g)
            message.delete()

            if (invite != null) {
                message.channel.send("**Group description:** " + content.replace(regex, "") + "\n" + invite[0]).then(message => {
                    inviteCache[invite[0]] = message.id

                    fs.writeFile("cache.json", JSON.stringify(inviteCache, null, 2), function(err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                })

                if (inviteCache[invite[0]] !== undefined) {
                    message.channel.messages.fetch(inviteCache[invite[0]])
                        .then(message => message.delete())
                        .catch(console.error);
                }
            }
        }
    }
})

client.login(config.token)
