/**
 * FinskuBot - notify
 * Author: Markus (github/markspl)
 * 
 * Give a specific role for the user
 */

const { discord_options } = require("../config.json");
const BOT_HOMESERVER = process.env.BOT_HOMESERVER || discord_options.bot_homeserver;

module.exports = {
	command: "notify",
	catalog: 1,
	server: [BOT_HOMESERVER],
	user: [],
	role: [],
	hidden: false,
	description: "Get notifications",
	parameters: ["list", "role"],
	execute: function (Client, message, args, guildMember) {

		// List of available roles
		const roleList = {
			"monstercat": "368160456319172610",
		};

		// List available roles
		if (args[0] == "list") {
			let response_list = "ℹ **Available roles**\n`";
			for (let i = 0; i < list.length; i++) {
				response_list += list[i];
				if (i != (list.length - 1)) response_list += ", ";
			}
			response_list += "`";
			return message.channel.send(response_list);

			// Roles
		} else if (args[0] == "role") {
			if (!args[1] in roleList) {
				// Check if role is not in the object
				return message.channel.send("️⁉ <@" + message.author.id + ">, I don't know role named `" + args[1] + "`");

			} else if (args.length > 2) {
				// Check how many arguments command has (no more than 2)
				return message.channel.send("️⁉ <@" + message.author.id + ">, too many arguments`");
			}

			// Give the role
			if (!message.guild.members.get(message.author.id).roles.get(roleList[args[1]])) {
				message.guild.members.get(message.author.id).addRole(roleList[args[1]], "FinskuBot's !notify command (addRole)").catch(console.error);
				message.channel.send("️✅ <@" + message.author.id + ">, you will get `" + args[1] + "` notifications!");

				// Remove the role
			} else if (message.guild.members.get(message.author.id).roles.get(roleList[args[1]])) {
				message.guild.members.get(message.author.id).removeRole(roleList[args[1]], "FinskuBot's !notify command (removeRole)").catch(console.error);
				message.channel.send("️🚫 <@" + message.author.id + ">, you'll don't get `" + args[1] + "` notifications anymore!");
			}
		} else {
			// Show command information
			const response = "ℹ **Notifications**\nGet notifications with joining roles.\n"; +
				"`list` - Check available notification roles\n`role <rolename>` - Join/Leave role";

			// Keeping chat clean from bot commands
			return message.channel.send(response).then(m => m.delete(60000));
		}
	}
}