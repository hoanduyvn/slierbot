const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { Player } = require('discord-player');
const TOKEN = process.env.TOKEN;
const { readdirSync } = require('fs');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // for guild related things
    GatewayIntentBits.GuildMembers, // for guild members related things
    GatewayIntentBits.GuildIntegrations, // for discord Integrations
    GatewayIntentBits.GuildVoiceStates, // for voice related things
    GatewayIntentBits.GuildMessages, // for guild messages things
    GatewayIntentBits.GuildMessageTyping, // for message typing things
    GatewayIntentBits.MessageContent // enable if you need message content things
  ],
})

/*client.player = new Player(client, {
	ytdlOptions: {
        quality: 'highestaudio', //Please don't touch
        highWaterMark: 1 << 25 //Please don't touch
    }
});
const player = client.player*/

client.once('ready', () => {
	console.log(`${client.user.username} has logged in !`);
	client.user.setPresence({ activities: [{ name: "The Maxslie", type: 2 }], status: 'online' });
});

client.commands = new Collection();
client.aliases = new Collection();
client.categories = readdirSync("./commands/");

["command"].forEach(handler => {
	require(`./handlers/${handler}`)(client);
})

client.on('messageCreate', (message)  => {
	if(message.author.bot) return;
	const prefix = '-';
	if(!message.content.startsWith(prefix)) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();
	if(cmd.length === 0) return;
	let command = client.commands.get(cmd);
	if(!command) command = client.commands.get(client.aliases.get(cmd));
	if(command) command.run(client, message, args);
});

client.login(TOKEN);