const { AudioPlayer, createAudioResource, StreamType, joinVoiceChannel} = require("@discordjs/voice");
const { getAudioUrl } = require('google-tts-api');

module.exports = {
	name: 'speak',
	aliases: ['s'],
	category: 'fun',
	run: async (client, message, args) => {
		if(!args[0]) return message.reply('Please type anything you want to say!');
		const string = args.join(' ');
		if(string.length > 500) return message.reply('Please type less than 500 characters!');
		const voiceChannel = message.member.voice.channelId;
		if(!voiceChannel) return message.reply('Please join the voice chat channel to use this command!');
		const audioURL = await getAudioUrl(string, {
			lang: 'vi',
			slow: false,
			host: 'https://translate.google.com',
			timeout: 1000,
		});

		try {
			let audioPlayer=new AudioPlayer();
			const connection = joinVoiceChannel({
				channelId: voiceChannel,
				guildId: message.guild.id,
				adapterCreator: message.guild.voiceAdapterCreator,
			})
			const audioResource=createAudioResource(audioURL, {inputType: StreamType.Arbitrary, inlineVolume:true});
			//if(connection.Playing) return message.reply("I'm busy, please wait!");
			connection.subscribe(audioPlayer);
			audioPlayer.play(audioResource);
		}
		catch(e) {
			message.reply('Sorry, I got some problems. Please try again!');
			console.error(e);
		};
	},
}