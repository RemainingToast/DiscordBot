const commando = require('discord.js-commando')
const discord = require("discord.js");
const axios = require('axios')
const config = require('../../config.json')

module.exports = class Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'darkmeme',
            group: 'misc',
            memberName: 'darkmeme',
            description: 'Generate random dark meme',
        });
    }

    async run(message) {
        if(message.channel.id === config.bot_ch_id || message.channel.id === config.meme_ch_id) {
            axios.get('https://www.reddit.com/r/darkmemers/random/.json')
                .then((result) => {
                    const content = result.data;
                    const permalink = content[0].data.children[0].data.permalink;
                    const url = `https://reddit.com${permalink}`;
                    const image = content[0].data.children[0].data.url;
                    const title = content[0].data.children[0].data.title;
                    const upVotes = content[0].data.children[0].data.ups;
                    const downVotes = content[0].data.children[0].data.downs;
                    const comments = content[0].data.children[0].data.num_comments;

                    const embed = new discord.MessageEmbed()
                        .setTitle(`${title}`)
                        .setURL(`${url}`)
                        .setColor('#00f800')
                        .setImage(image)
                        .setFooter(`👍 ${upVotes}  👎 ${downVotes}  💬 ${comments}`)

                    message.channel.send(embed)
                })
        } else message.delete()
    }
}
