// FINSKUBOT //////////////////////////////////////////////////////////////////////////////////////

process.title = "FinskuBot";

var Discord = require("discord.js"),
	Nowplaying = require("./nowplaying.js"),
	Client = new Discord.Client(),
	fs = require("fs"),
	path = require("path");
	Config = require("./config.json"),
	Package = require("./package.json"),
	prefix = Config.discord_options.bot_prefix;

// STRINGS ////////////////////////////////////////////////////////////////////////////////////////

const message_dm = "I don't serve you personally!\nTry again but on this time write the command \ninto the guild channel where I'm serving my master(s).",
	message_mention = "Hi there, I'm FinskuBot!\nUse **!finskubot** to see the command list! *bzzzzzz*",
	message_no_role = "You don't have permission to use that command! `role missing`";

// BOT ////////////////////////////////////////////////////////////////////////////////////////////

Client.once("ready", async () => {
	console.time("# Loading");
	Client.load();
	Client.user.setGame(` - !finskubot | ${Package.version}`);
	console.log(`# FinskuBot version:\x1b[36m ${Package.version} \x1b[0m\n# Logged in as ${Client.user.tag}!\n# Serving in ${Client.guilds.array().length} servers`);
	console.timeEnd("# Loading");
	console.log("# I'm ready!");
	Client.channels.get("364767078470909963").send(`**I'm up!** *Use me!* (͡° ͜ʖ ͡°)\n[${new Date().toUTCString()}]`);
});

Client.load = (command) => {
	const commandList = fs.readdirSync(__dirname +"/commands/");
	if(command){
		if(commandList.indexOf(command + ".js") >=0){
			delete require.cache[require.resolve(__dirname + "/commands/" + command)];
			Client.commands[command] = require(__dirname + "/commands/" + command);
		}
	} else {
		Client.commands = [];
		for(let i = 0; i < commandList.length; i++){
			const item = commandList[i];
			if (item.match(/\.js$/)){
				delete require.cache[require.resolve(__dirname + "/commands/" + item)];
				Client.commands[item.slice(0,-3)] = require(__dirname + "/commands/" + item);
			}
		}
		
		console.log("# # Commands loaded : " + commandList.length);
	}
};

Client.on("guildCreate", async (guild) => {
	console.info(`# Joined Guild "${Client.guilds.get(guild).name}"`).catch(console.error);;
});

Client.on("disconnect", event => {
    console.log("# Disconnected : \n" + event.reason);
});

// MESSAGE HANDLER ////////////////////////////////////////////////////////////////////////////////

Client.on("message", message => {
    if (message.channel.type === "dm" && message.author.id !== Client.user.id) {
        message.channel.send(message_dm);
    } else if (message.channel.type === "text") {
        if (message.isMentioned(Client.user)) {
            message.reply(message_mention);
        } else {
            var message_text = message.content;
            if (message.content.startsWith(prefix)) {
				let args = message.content.split(" ");
				const command = args[0].slice(prefix.length);
				const guildMember = message.author.id;
				args.splice(0,1);
				
				if(command in Client.commands){
					if(Client.commands[command].server == message.guild.id || Client.commands[command].server.length === 0){
						if(message.author.id == Client.commands[command].user || Client.commands[command].user.length === 0){
							//console.log("DEBUG > roles : " + Client.commands[command].role);
							if(message.guild.members.get(message.author.id).roles.get(`${Client.commands[command].role}`) || Client.commands[command].role.length === 0){
								// console.log("DEBUG > args : " + args);
								console.log(`[*${new Date().toLocaleString()}*][**${message.guild.name}**] [${message.author.username} (*${message.author.id}*)] uses ${message.content}`);
								Client.commands[command].execute(Client, message, args, guildMember);
							}else{
								message.channel.send(message_no_role).then(m => m.delete(30000));
								console.log(`[*${new Date().toLocaleString()}*][**${message.guild.name}**] [${message.author.username} (*${message.author.id}*)] tried to use command ${command} [role missing]`);
							}
						}
					}
				}
            }
        }
    }
});

// NOWPLAYING /////////////////////////////////////////////////////////////////////////////////////

exports.nowplaying = function nowplaying(song,artist){
	const embed = new Discord.RichEmbed()
		.addField("🎵 Now playing",`\n${song}\nby ${artist}`)
		.setURL("https://www.twitch.tv/monstercat")
		.setThumbnail("https://i.imgur.com/7KTOtj1.png")
		.setTimestamp();
		
		Client.channels.get("374676313564381185").send({embed});	
}

// BOOT ///////////////////////////////////////////////////////////////////////////////////////////

console.log(`# Logging in with token (${new Date().toLocaleString()}).\n# Using prefix "${Config.discord_options.bot_prefix}"`);
Client.login(Config.discord_options.bot_token).catch(console.error);