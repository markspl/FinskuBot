const Discord = require("discord.js"),
	Config = require("../config.json");

module.exports = {
	command: "request",
	catalog: 1,
	server: [Config.discord_options.bot_homeserver],
	user: [],
	role: [],
	hidden: false,
	description: "Request command",
	parameters: ["color <#colorcode>","role <params>"],
	execute: function(Client, message, args, guildMember) {
		var list = ["streamer","artist"];

		//uppercases tolowerCases
		if(args[1]){
			args[1]=args[1].toLowerCase();
		}

		//request
		// > prints what you can do
		if(!message.guild.members.get(message.author.id).roles.get("418384797350756353")) return message.channel.send("️🚫 <@" + message.author.id +">, you need a `@👤 Member` role to do that!\nFor more information check <:finsku:358003359447252993>**FAQ** on <#357863069118103552> channel.");//.then(m => m.delete(60000));

		if(!args[0]){
			var response = "ℹ **Request**\nRequest nickname color or roles.\n";
			response += "`color <#colorcode>` - Request nickname color\n`role <params>` - Request a specific role with arquments";
			response += "\n\nFind a color code here: <http://googl.com/#q=color+picker>";
			return message.channel.send(response);//.then(m => m.delete(60000));
		}else if(args[0] == "color" || args[0] == "colour"){
			if(!args[1]){
				//request color
				// > prints how-to
				var response = "ℹ **Request - Color**\nRequest nickname color.\n";
				response += "`color <#colorcode>` - Request nickname color\n`color none` - Remove nickname color";
				response += "\n\nFind a color code here: <http://googl.com/#q=color+picker>";
				return message.channel.send(response);//.then(m => m.delete(60000));

			}else if(args[1] == "none"){
				//request color none
				// > remove role id
				// No role > send message about it
				if(!message.guild.members.get(message.author.id).roles.find("name",`${message.author.id}`)){
					if(message.guild.roles.find("name", `${message.author.id}`)){
						message.guild.roles.find("name", `${message.author.id}`).delete("FinskuBot's !request command (delete)").catch(console.error);
					}
					message.channel.send("️🚫 <@" + message.author.id +">, you don't have any colors.\nSet color first `!request color <#code>` then remove it <:Kappa:370584690572394526>`");

				// If role > remove and report about it
				}else if(message.guild.members.get(message.author.id).roles.find("name",`${message.author.id}`)){
					let role = message.guild.members.get(message.author.id).roles.find("name",`${message.author.id}`);
					message.guild.roles.find("name", `${message.author.id}`).delete("FinskuBot's !request command (removeRole)").catch(console.error);
					message.channel.send("️✅ <@" + message.author.id +">, you removed color successfully!");
				}
			}else if(/(^#[0-9A-F]{6}$)/i.test(args[1]) || /(^[0-9A-F]{6}$)/i.test(args[1])){
				//request color #000000

				if(/(^[0-9A-F]{6}$)/i.test(args[1])) args[1] = "#"+args[1];









				// user doesn't have a color role. Give it.
				if(!message.guild.)

				if(!message.guild.members.get(message.author.id).roles.find("name",`${args[1]}`) && message.guild.roles.find("name", `${args[1]}`)){
					let role = message.guild.roles.find("name", `${args[1]}`);
					role.setColor(args[1]);

					message.guild.members.get(message.author.id).addRole(role).catch(console.error);
					//message.channel.send("️✅ <@" + message.author.id +">, successfully changed your color to `" + args[1] + "`! `DEBUG: no role, role found on guild, edit role and give it`");

					const embed = new Discord.RichEmbed()
						.setAuthor(message.author.username + ", enjoy your new color " + args[1] + "!", "https://cdn.discordapp.com/attachments/364767078470909963/373886303860949014/asd.png")
						.setColor(args[1]);
						//.setFooter("DEBUG: no role, role found on guild, edit role and give it");

					message.channel.send({embed});

					return null;

				// if no role, create new
				}else if(!message.guild.members.get(message.author.id).roles.find("name",`${args[1]}`)){
					message.guild.createRole({
						name: `${args[1]}`,
						color: `${args[1]}`,
						mentionable: false,
						permissions: 0
					}).then(role => message.guild.members.get(message.author.id).addRole(role).catch(console.error));
					//let role = message.guild.roles.find("name", `${message.author.id}`);
					//let role = message.guild.roles.find("name", `${message.author.id}`);
					//message.guild.members.get(message.author.id).addRole(role).catch(console.error);
					//message.channel.send("️✅ <@" + message.author.id +">, enjoy your new color `" + args[1] + "`! `DEBUG: no role, no role on group, create role and give it`");

					const embed = new Discord.RichEmbed()
						.setAuthor(message.author.username + ", enjoy your new color " + args[1] + "!", "https://cdn.discordapp.com/attachments/364767078470909963/373886303860949014/asd.png")
						.setColor(args[1]);
						//.setFooter("DEBUG: no role, no role on group, create role and give it");

					message.channel.send({embed});

					return null;
				}
				// if a role > update
				else if(message.guild.members.get(message.author.id).roles.find("name",`${args[1]}`)){
					let role = message.guild.members.get(message.author.id).roles.find("name",`${args[1]}`);
					role.setColor(args[1]);
					//message.channel.send("️✅ <@" + message.author.id +">, successfully changed your color to `" + args[1] + "`! `DEBUG: role found, update role and give it`");

					const embed = new Discord.RichEmbed()
						.setAuthor(message.author.username + ", you changed color to " + args[1] + "!", "https://cdn.discordapp.com/attachments/364767078470909963/373886303860949014/asd.png")
						.setColor(args[1]);
						//.setFooter("DEBUG: role found, update role and give it");

					message.channel.send({embed});

					return null;
				}
			}else if(/(^#[0-9A-F]{3}$)/i.test(args[1])){
				message.channel.send("🚫 <@" + message.author.id +">, check that you used six characters after `#` like `#ff0000`.\nI don't accept color codes with three characters `"+args[1]+"`!");
			}else{
				var response = "ℹ **Request**\nRequest nickname color or roles.\n";
				response += "`color <#colorcode>` - Request nickname color\n`role <params>` - Request a specific role with arquments";
				response += "\n\nFind a color code here: <http://googl.com/#q=color+picker>";
				return message.channel.send(response);//.then(m => m.delete(60000));
			}

		} else if(args[0] == "role"){
			if(!args[1]){
				var response = "ℹ **Request - Role**\nRequest role.\n";
				response += "`role streamer <twitch/highbox username>` - Request/remove Streamer-role. Username example `FinskuTV`.\n`role artist` - Request Artist role.";

				return message.channel.send(response);//.then(m => m.delete(60000));
			}else{

				switch(args[1]){
					case "streamer":
						var role_number = "367767038179147779";
						break;
					case "artist":
						var role_number = "361076013586972672";
						break;
					default:
						return message.channel.send("️⁉ <@" + message.author.id +">, I don't know role named `" + args[1] + "`");
				}

				// Give role
				if(!message.guild.members.get(message.author.id).roles.get(role_number)){
					if(args[1] == "artist" || args[1] == "streamer" && args[2]){
						message.guild.members.get(message.author.id).addRole(role_number, "FinskuBot's !request command (addRole)").catch(console.error);
						message.channel.send("️✅ <@" + message.author.id +">, you got role `" + args[1] + "`!");
					}else if(args[1] == "streamer" && !args[2]){
						message.channel.send("️🚫 <@" + message.author.id +">, you didn't tell your Twitch/Highbox username!\nUse command `!request role streamer <twitch/highbox username>`!");
					}else return message.channel.send("️⁉ <@" + message.author.id +">, I didn't get that one, try again!");

					if(args[1] == "streamer" && args[2]){
						Client.channels.get("368501831036436481").send("➕ **<@210125258034905089>, user <@" + message.author.id + "> wants `@📺 Streamer` role**.\nAdd Twitch/Highbox username `" + args[2] + "` in Mee6 settings:\n<https://mee6.xyz/dashboard/342316064711114753/streamers>");
					}

				// Remove role
				}else if(message.guild.members.get(message.author.id).roles.get(role_number)){
					message.guild.members.get(message.author.id).removeRole(role_number, "FinskuBot's !request command (removeRole)").catch(console.error);
					message.channel.send("️🚫 <@" + message.author.id +">, you're not `" + args[1] + "` anymore!");
					if(args[1] == "streamer"){
						Client.channels.get("368501831036436481").send("➖ **<@210125258034905089>, user <@" + message.author.id + "> quit from `@📺 Streamer` role**.\nRemove Twitch/Highbox username `" + args[2] + "` in Mee6 settings:\n<https://mee6.xyz/dashboard/342316064711114753/streamers>");
					}
				}
			}

		} else {
			var response = "ℹ **Request**\nRequest nickname color or roles.\n";
			response += "`color <#colorcode>` - Request nickname color\n`role` - List of available roles\n`role <params>` - Request a specific role with arquments";
			response += "\n\nFind a color code here: <http://googl.com/#q=color+picker>";
			return message.channel.send(response);//.then(m => m.delete(60000));
		}
	}
}
