const commando = require('discord.js-commando')
const path = require('path')

const config = require('./config.json')
const axios = require('axios')
const {TextChannel} = require("discord.js");

const client = new commando.CommandoClient({
    owner: config.owner_id,
    commandPrefix: config.prefix
})

var inviteCache = [];

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
        if (message.channel.id === config.ad_channel_id) {
            const invite = message.content.match(/(https?:\/\/)?(www.)?(discord.(gg|io|me|li)|discordapp.com\/invite)\/[^\s/]+?(?=\b)/g)
            message.delete()
            if (invite != null && !inviteCache.includes(invite[0])) {
                message.channel.send(invite[0])
                inviteCache.push(invite[0])
            }
        }
    }
})

client.login(config.token)
