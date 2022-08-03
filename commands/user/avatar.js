const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
	name: 'avatar',
	aliases: ['ava'],
	category: 'fun',
	run: (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
		let URL = member.displayAvatarURL({ dynamic: true, format: "jpg", size: 4096 })
		let avatarEmbed = new EmbedBuilder()
			.setColor('007fff')
			.setImage(URL)
			.setTimestamp()
			.setTitle(`${member.user.tag}\nAvatar`) //member.user.username
			.setFooter({ text: `Requested by ${message.author.tag}` })

		const button = new ButtonBuilder()
      		.setEmoji("🔗")
      		.setLabel("Download")
      		.setStyle(5)
      		.setURL(URL)

      	const row = new ActionRowBuilder().addComponents(button);
		message.channel.send({ embeds: [avatarEmbed], components: [row] })
	}
}