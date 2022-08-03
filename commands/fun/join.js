const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: "join",
    category: 'fun',
    run: async (client, message, args) => {
    	const voiceChannel = message.member.voice.channelId;
    	if(!voiceChannel) return message.reply('Please join the voice chat channel to use this command!');
    	const connection = joinVoiceChannel({
			channelId: voiceChannel,
			guildId: message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator,
		});
    },
};