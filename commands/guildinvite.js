const Discord = require("discord.js");

module.exports = {
	command: "guildinvite",
	catalog: 1,
	server: ["342316064711114753"],
	user: [],
	role: [],
	hidden: false,
    description: "Invite your slimy friends",
    parameters: [],
	execute: async(Client, message, args, guildMember) => {
		
		/*message.guild.fetchInvites().then( invites => {
		
		const invite = invites.array();
		
		const code = invite[0].code;
		const used = invite[0].uses;
		const timestamp = new Date(invite[0].createdTimestamp);
		const time = `${timestamp.getDate()}-${timestamp.getMonth()+1}-${timestamp.getFullYear()}`;
		
		const embed = new Discord.RichEmbed()
			.setTitle("Guild Invite")
			.setThumbnail(message.guild.iconURL)
			.addField("Invite your *slime* friends:", "http://www.discord.gg/" + code)
			.setFooter("Uses: " + used + " | Created: " + time);
		
		message.channel.send({embed});
		
		});*/
				
		//WORKING (old code)
		var response = "🔗 **Use this link to invite your *slimy* friends:**\n";	

		message.guild.fetchInvites().then( invites => {
			
			const invite = invites.array();
			
			var code = invite[0].code;	
			var used = invite[0].uses;
			
			const address = "https://discord.gg/" + code;
			
			message.channel.send(response + address + " (*Used " + used + " times*)");
		});
	}
}