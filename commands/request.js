/**
 * FinskuBot - request
 * Author: Markus (github/markspl)
 * 
 * Request specific colour (code)
 */

const Discord = require("discord.js");
const Config = require("../config.json");

module.exports = {
	command: "request",
	catalog: 1,
	server: [Config.discord_options.bot_homeserver],
	user: [],
	role: ["354574809969197066", "418384797350756353"],
	hidden: false,
	description: "Request command",
	parameters: ["color <#colorcode>"],
	execute: function (Client, message, args, guildMember) {

		const colorInfo = "ℹ **Request**\nRequest nickname color.\n`color <#colorcode>` - Request nickname color\n`color none` - Remove nickname color\n`color random` - Random color\n\nFind a color code here: <https://google.com/search?q=color+picker>";

		// Short Id from long snowflake. Is used as role name
		const authorId = message.author.id.slice(-5);

		if (args[0] == "color" || args[0] == "colour") {
			if (!args[1] || args[2]) {
				// Request colour
				// Print how-to

				return message.channel.send(colorInfo);

			} else if (args[1] == "none") {
				// Request to remove custom colour.

				if (!message.guild.members.get(message.author.id).roles.find(x => x.name === authorId)) {

					// Delete colour role
					if (message.guild.roles.find(x => x.name === authorId)) {
						message.guild.roles.find(x => x.name === authorId)
						.delete("FinskuBot's !request command (delete)")
						.catch(console.error);
					}

					message.channel.send("️✅ <@" + message.author.id + ">, you removed color successfully!");

				} else if (message.guild.members.get(message.author.id).roles.find(x => x.name === authorId)) {
					// If role > remove and report about it

					let role = message.guild.members.get(message.author.id).roles.find(x => x.name === authorId);
					
					message.guild.roles.find(x => x.name === authorId)
					.delete("FinskuBot's !request command (removeRole)")
					.catch(console.error);
					
					message.channel.send("️✅ <@" + message.author.id + ">, you removed color successfully!");
				} else {
					message.channel.send("️🚫 <@" + message.author.id + ">, you don't have any colors.\nSet color first `!request color <#code>` then remove it <:Kappa:1001233192906403912>`");
				}

			} else if (!/(^#[0-9a-fA-F]{6}$)/i.test(args[1])) {
				// Check colour code is correct
				return message.channel.send("🚫 <@" + message.author.id + ">, check that you used six characters after `#` like `#ff0000`.\nI don't accept color codes with three characters `" + args[1] + "`!");

			} else {
				let colourCode = args[1];

				// Discord doesn't accept vantablack
				if (colourCode === "#000000") colourCode = "#010101";

				if (!message.guild.members.get(message.author.id).roles.find(x => x.name === authorId) && message.guild.roles.find(x => x.name === authorId)) {
					// If not in member roles, is guild role

					let role = message.guild.roles.find(x => x.name === authorId);
					role.setColor(colourCode);

					message.guild.members.get(message.author.id).addRole(role).catch(console.error);

					const embed = new Discord.RichEmbed()
						.setAuthor(message.author.username + ", enjoy your new color " + colourCode + "!", "https://cdn.discordapp.com/attachments/364767078470909963/373886303860949014/asd.png")
						.setColor(colourCode);

					message.channel.send({ embed });

					return null;

				} else if (!message.guild.members.get(message.author.id).roles.find(x => x.name === authorId)) {
					// If no color role, create new

					message.guild.createRole({
						name: authorId,
						color: colourCode,
						mentionable: false,
						permissions: 0
					})
						.then(role => message.guild.members.get(message.author.id)
							.addRole(role)
							.catch(console.error));

					const embed = new Discord.RichEmbed()
						.setAuthor(message.author.username + ", enjoy your new color " + colourCode + "!", "https://cdn.discordapp.com/attachments/364767078470909963/373886303860949014/asd.png")
						.setColor(colourCode);

					message.channel.send({ embed });

					return null;

				} else if (message.guild.members.get(message.author.id).roles.find(x => x.name === authorId)) {
					// if a role > update

					let role = message.guild.members.get(message.author.id).roles.find(x => x.name === authorId);
					role.setColor(colourCode);

					const embed = new Discord.RichEmbed()
						.setAuthor(message.author.username + ", you changed color to " + colourCode + "!", "https://cdn.discordapp.com/attachments/364767078470909963/373886303860949014/asd.png")
						.setColor(colourCode);

					message.channel.send({ embed });

					return null;
				}
			}

		} else {
			return message.channel.send(colorInfo);
		}
	}
}