const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    name: "leave",
    category: 'fun',
    run: async (client, message, args) => {
    	const voiceChannel = message.member.voice.channelId;
    	const connection = getVoiceConnection(message.guild.id);
    	if(!voiceChannel) return message.reply('Please join the voice chat channel to use this command!');
        if(!connection) return message.reply("Bot doesn't join any channel!");
    	connection.destroy();
    },
};