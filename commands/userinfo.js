const Discord = require("discord.js");

module.exports = {
	command: "userinfo",
	catalog: 1,
	server: [],
	user: [],
	role: [],
	hidden: false,
	description: "Check what informations I can get",
	parameters: [],
	execute: function(Client, message, args, guildMember) {
		
		if(args[0]) return message.reply("don't use any arguments. Only the command `!userinfo`, thanks! :ok_hand:");
		
		var n = new Date();
		var c = user.createdAt;
		
		console.log(c);
		
		var now = Date.UTC(n.getFullYear(), n.getMonth(), n.getDate());
		var created = Date.UTC(c.getFullYear(), c.getMonth(), c.getDate());
		
		var diff = Math.floor((now - created) / (1000*60*60*24));
		
		var info_user = `**Username:** ${user.username}\n\n`;
		info_user += `**Status:** ${user.presence.status}\n\n`;
		
		if(user.presence.game) info_user += `**Plays:** ${user.presence.game}\n\n`;
		
		info_user += `**ID:** ${user.id}\n\n`;
		info_user += `**Bot:** ${user.bot}\n\n`;
		info_user += `**Created:** ${user.createdAt} (${diff} days ago)\n\n`;
		info_user += `**Last message ID:** ${user.lastMessageID}\n\n`;
		info_user += `**Last message sent:** ${user.lastMessage.createdAt}\n\n`;
		info_user += `**Last message:** "${user.lastMessage.content}"\n\n`;		
			
		const embed = new Discord.RichEmbed()
			.setTitle(`👤 ${user.tag}`)
			.setColor("#6800a5")
			.setThumbnail(user.avatarURL)
			.addField("User info",info_user);
		
		message.channel.send({embed});
	}
}