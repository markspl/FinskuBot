const Discord = require("discord.js");

module.exports = {
	command: "broadcast",
	catalog: 1,
	server: ["342316064711114753"],
	user: [],
	role: ["354574809969197066"],
	hidden: false,
	description: "[A] Send notifications",
	parameters: ["monstercat <link,text>"],
	execute: function(Client, message, args, guildMember) {
		
		if(!args[0]){
			message.delete();
			message.channel.send("️ℹ️ <@" + message.author.id +">, a link / text missing").then(m => m.delete(10000));
			return;
		}else if(args[0] == "monstercat"){
			message.delete();
			if(!args[1]){
				return message.channel.send("️ℹ️ <@" + message.author.id +">, a link / text missing").then(m => m.delete(10000));
			}else if(args[1].startsWith("https://www.youtube.com/watch?v=") || args[1].startsWith("https://youtu.be/")){
				return message.channel.send("📍 **New Monstercat video!** <@&368160456319172610>\n" + args[1]).then(m => m.pin());
			}else{
				var broadcast = args.slice(1);
				var notification = broadcast.join(" ");
				message.channel.send(notification + "\n <@&368160456319172610>");
			}
		}else{
			message.delete();
			message.channel.send("⚠️ I didn't understand, try again!").then(m => m.delete(10000));
		}
		
	}
}