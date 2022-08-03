const { EmbedBuilder } = require('discord.js')
module.exports = {
    name: "ping",
    category: 'user',
    run: async (client, message, args) => {
    	const start = Date.now();
        const embed = new EmbedBuilder()
            .setColor('007fff')
            .setTitle(client.user.username + " - Pong 🏓")
            .setThumbnail(client.user.displayAvatarURL())
            .addFields([
                //{ name: `Message Ping`, value: `\`${Date.now() - start}ms\` 🛰️` },
                { name: `Message Latency`, value: `\`${Date.now() - start}ms\` 🛰️` },
                { name: `API Latency`, value: `\`${Math.round(client.ws.ping)}ms\` 🛰️` }
            ])
            .setTimestamp()
			.setFooter({ text: `Requested by ${message.author.tag}` })
        message.channel.send({ embeds: [embed] });
    },
};
