const commando = require('discord.js-commando')
const path = require('path')

const config = require('./config.json')
const axios = require('axios')

const client = new commando.CommandoClient({
    owner: config.owner_id,
    commandPrefix: config.prefix
})

client.on('ready', () => {
    console.log('[INFO] Bot is ready and starting!')

    client.registry
        .registerGroups([
            ['admin', 'admin commands'],
            ['info', 'info commands'],
            ['misc', 'misc commands'],
            ['server', 'server commands']
        ])
        .registerCommandsIn(path.join(__dirname, 'commands'))

    console.log('[INFO] Commands registered')

    setInterval(() => {
        axios.get(`https://mcapi.xdefcon.com/server/${config.server_ip}/full/json`).then((result) => {
            const status = String(result.data.serverStatus)
            const players = String(result.data.players)

            if(status.startsWith('offline') || status === 'offline'){
                client.user.setPresence({ activity: { name: `Server is offline :(`, type: 0 }, status: 'dnd' })
            } else {
                client.user.setPresence({ activity: { name: `${players} players`, type: "WATCHING" }, status: 'online' })
            }

        }).catch((error) => { console.log(error) })
    }, 5000)

})

client.login(config.token)