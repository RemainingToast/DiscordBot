const commando = require('discord.js-commando')
const discord = require("discord.js");
const axios = require('axios')

module.exports = class Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'meme',
            group: 'misc',
            memberName: 'meme',
            description: 'Generate random meme',
        });
    }

    async run(message) {
        axios.get('https://www.reddit.com/r/dankmemes/random/.json')
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
    }
}
