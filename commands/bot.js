/**
 * FinskuBot - bot
 * Author: Markus (github/markspl)
 * 
 * Admin command to reload commands
 */

const { discord_options } = require("../config.json");
const BOT_OWNER = process.env.BOT_OWNER || discord_options.bot_owner;

module.exports = {
	command: "bot",
	catalog: 1,
	server: [],
	user: [BOT_OWNER],
	role: [],
	hidden: false,
	description: "[A] Control bot",
	parameters: ["reload <command>"],
	execute: function (Client, message, args, guildMember) {
		message.delete();

		if (args[0] == "reload") {
			// 'bot reload'
			console.time('# Loading');

			if (args[1] && Client.commands[args[1]]) {
				// Reload specific command
				message.channel.send("♻ **Reloading command " + args[1] + " ...**").then(m => m.delete(5000));
				console.log("# Reloading command " + args[1]);
				Client.load(args[1]);

				message.channel.send("♻ **Reloaded command " + args[1] + " !**");

			} else if (!args[1]) {
				// Reload all commands
				message.channel.send("♻ **Reloading commands ...**").then(m => m.delete(5000));
				console.log("# Reloading commands ... ");
				Client.load();

				message.channel.send("♻ **Reloaded commands !**");
			} else {
				// Command not found
				message.channel.send("⚠ Can't find command " + args[1]).then(m => m.delete(10000));
				return;
			}

			console.timeEnd('# Loading');
			console.log("# Reloaded!");

		} else {
			// Respond with command information
			const response = "⚠ Use reload parameters\n`reload <command>` - Reload(s) command file(s)";
			message.channel.send(response).then(m => m.delete(60000));
		}
	}
}