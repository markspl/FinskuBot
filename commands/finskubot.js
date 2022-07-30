/**
 * FinskuBot - finskubot
 * Author: Markus (github/markspl)
 * 
 * Show available commands listed in categories
 * 1 == "Utility"
 * 2 == "Fun"
 */

const { discord_options } = require("../config.json");
const BOT_PREFIX = process.env.BOT_PREFIX || discord_options.bot_prefix;

const Package = require("../package.json");

module.exports = {
	command: "finskubot",
	catalog: 1,
	server: [],
	user: [],
	role: [],
	hidden: false,
	description: "I'm bot *bzz bzz'z*",
	parameters: [],
	execute: function (Client, message, args, guildMember) {
		message.delete();

		// Count of catalogs
		const countCatalogs = 2;

		let response = ":robot: **Commands:**";

		// Print all catalogs and commands
		for (let i = countCatalogs; i >= 0; i--) {
			// Topics for catalogs
			if (i == 2) response += "\n\n**Fun**";
			if (i == 1) response += "\n\n**Utility**";

			// Print commands
			for (let command in Client.commands) {
				const c = Client.commands[command];

				if (c.catalog == i) {
					// Show commands which are for everyone and for the guild
					if (c.server == message.guild.id || !c.server.length) {
						// Command is not hidden from this command
						if (c.hidden == false) {
							// Check does user have rights to use the command
							if (c.user == message.author.id || c.user.length === 0) {
								response += "\n`" + BOT_PREFIX + c.command + "";
								// Show parameters
								if (c.parameters != 0) {
									response += " [" + c.parameters + "]";
								}

								response += "` : " + c.description;
							}
						}
					}
				}
			}
		}

		message.channel.send(response + "\n\n*V" + Package.version + "* | *Serving in " + Client.guilds.array().length + " server(s)*")
			.then(m => m.delete(3600000));
	}
}