/**
 * FinskuBot - Another stupid Discord/Twitch bot.
 * Author: Markus (github/markspl)
 */

const fs = require("fs");
const Discord = require("discord.js");
const Client = new Discord.Client();

const { discord_options, dev } = require("./config.json");
const { version } = require("./package.json");

process.title = "FinskuBot";
const prefix = discord_options.bot_prefix;

// Strings
const MESSAGE_DM = "I don't serve you personally!\nTry again but on this time write the command \ninto the guild channel where I'm serving my master(s).";
const MESSAGE_MENTION = "Hi there, I'm FinskuBot!\nUse **!finskubot** to see the command list! *bzzzzzz*";
const MESSAGE_NOROLE = "You don't have permission to use that command!\nReason: `role missing`";

// Bot launch
Client.once("ready", async () => {
	console.time("# Loading");
	Client.load();

	// Activity text on the user list (left panel)
	Client.user.setActivity(`${prefix}\finskubot | ${version}`);

	console.log(`# FinskuBot version: \x1b[36m${version} \x1b[0m`);
	console.log(`# Logged in as \x1b[36m${Client.user.tag}\x1b[0m`);
	console.log(`# Serving in \x1b[36m${Client.guilds.array().length} \x1b[0mserver(s)`);
	console.timeEnd("# Loading");
	console.log("\n# I'm ready!\n");

	// Report on specific Discord text channel bot is running
	Client.channels.get(discord_options.bot_homechannel).send(`**I'm up!** *Use me!* (͡° ͜ʖ ͡°)\n[${new Date().toUTCString()}]`);
});

// Load commands from ./commands folder
Client.load = (command) => {
	const commandList = fs.readdirSync(__dirname + "/commands/");

	// Check if commands are already loaded.
	if (command) {
		// Reload commands
		if (commandList.indexOf(command + ".js") >= 0) {
			delete require.cache[require.resolve(__dirname + "/commands/" + command)];
			Client.commands[command] = require(__dirname + "/commands/" + command);
		}
	} else {
		// Load commands
		Client.commands = [];
		for (let i = 0; i < commandList.length; i++) {
			const item = commandList[i];
			if (item.match(/\.js$/)) {
				delete require.cache[require.resolve(__dirname + "/commands/" + item)];
				Client.commands[item.slice(0, -3)] = require(__dirname + "/commands/" + item);
			}
		}

		console.log(`\n# Commands loaded: \x1b[36m"${commandList.length}\x1b[0m`);
	}
};

// Join a new guild
Client.on("guildCreate", async (guild) => {
	console.info(`# Joined Guild "${Client.guilds.get(guild).name}"`).catch(console.error.stack);;
});

// Disconnect from a guild
Client.on("disconnect", event => {
	console.log("# Disconnected : \n" + event.reason);
});

// Error occurred
Client.on("error", (err) => {
	console.log("\n##########\n## [ERROR]\n##########\n\n" + err.stack);
});

/**
 * Message handler
 */

Client.on("message", message => {
	if (message.channel.type === "dm" && message.author.id !== Client.user.id) {
		// Return message if private message is sent
		message.channel.send(MESSAGE_DM);

	} else if (message.channel.type === "text") {
		// Text channels
		if (dev == true && message.channel.id != discord_options.bot_homechannel) {
			return null;

		} else if (message.isMentioned(Client.user)) {
			// Bot is pinged with '@'
			message.reply(MESSAGE_MENTION);
		
		} else {
			// Checking if the message starts with the prefix set in config file
			if (message.content.startsWith(prefix)) {
			
				let args = message.content.split(" ");
				const command = args[0].slice(prefix.length);
				const guildMember = message.author.id;
				args.splice(0, 1);

				// Used a command which is found from folder './commands'
				if (command in Client.commands) {

					// Check if the command is made for specific server(s)
					if (Client.commands[command].server == message.guild.id || Client.commands[command].server.length === 0) {

						// ... for specific user(s)
						if (Client.commands[command].user.includes(message.author.id) || Client.commands[command].user.length === 0) {

							// ... for specific role(s)
							// Get all roles which user has
							const allUserRoles = [ ...message.guild.members.get(message.author.id).roles.keys() ];

							// Check if at least one role match
							if(Client.commands[command].role.some(r => allUserRoles.includes(r)) || Client.commands[command].role.length === 0) {
								
								// Execute command
								try {
									// Message logging
									console.log(`[${new Date().toLocaleString()}][${message.guild.name} (${message.guild.id})] [${message.author.username} (${message.author.id})] - ${message.content}`);
									Client.commands[command].execute(Client, message, args, guildMember);
								} catch (e) {
									console.log("\n##########\n## [ERROR]\n##########\n\n" + e.stack);
								}

							} else {
								// Inform command user they don't have correct role(s) to use the command
								console.log(MESSAGE_NOROLE);
								message.delete();
								message.channel.send(MESSAGE_NOROLE).then(m => m.delete(30000));
								console.log(`[*${new Date().toLocaleString()}*][**${message.guild.id}**] [${message.author.username} (*${message.author.id}*)] tried to use command ${command} [role missing]`);
							}
						}
					}
				}
			}
		}
	}
});

/**
 * Bot boot
 */

console.log(`# Launghing - (${new Date().toLocaleString()}).\n\n# Using prefix "\x1b[36m${discord_options.bot_prefix}\x1b[0m"`);
Client.login(discord_options.bot_token).catch(console.error);
