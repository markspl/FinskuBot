﻿const Discord = require("discord.js"),
	Config = require("../config.json");

module.exports = {
	command: "guildinvite",
	catalog: 1,
	server: [Config.discord_options.bot_homeserver],
	user: [],
	role: [],
	hidden: false,
    description: "Invite your slimy friends",
    parameters: [],
	execute: async(Client, message, args, guildMember) => {
	
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