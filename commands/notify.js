const Discord = require("discord.js");

module.exports = {
	command: "notify",
	catalog: 1,
	server: ["342316064711114753"],
	user: [],
	role: [],
	hidden: false,
	description: "Get notifications",
	parameters: ["list","notify"],
	execute: function(Client, message, args, guildMember) {
		const id = message.author.id;
		var list = ["monstercat"];
		
		if(!args[0]){
			var response = "ℹ **Notifications**\nGet notifications with joining roles.\n";
			response += "`list` - Check available notification roles\n`notify <rolename>` - Join/Leave role";
			return message.channel.send(response).then(m => m.delete(60000));
		}
		
		if(args[0] == "list"){
			var response_list = "ℹ **Available roles**\n`";
			for(var i = 0; i < list.length; i++){
				response_list += list[i];
				if(i != (list.length - 1)) response_list += ", ";
			}
			response_list += "`";
			return message.channel.send(response_list);
		}else{			
			switch(args[0]){
				case "monstercat":
					var role_number = "368160456319172610";
					break;
				default:
					return message.channel.send("️⁉ <@" + message.author.id +">, I don't know role named `" + args[0] + "`");
			}
			// Give role
			if(!message.guild.members.get(message.author.id).roles.get(role_number)){
				message.guild.members.get(message.author.id).addRole(role_number, "FinskuBot's !notify command (addRole)").catch(console.error);
				message.channel.send("️✅ <@" + message.author.id +">, you will get `" + args[0] + "` notifications!");
			// Remove role
			}else if(message.guild.members.get(message.author.id).roles.get(role_number)){
				message.guild.members.get(message.author.id).removeRole(role_number, "FinskuBot's !notify command (removeRole)").catch(console.error);
				message.channel.send("️🚫 <@" + message.author.id +">, you'll don't get `" + args[0] + "` notifications anymore!");
			}
		}
	}
}