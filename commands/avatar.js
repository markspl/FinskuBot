const Discord = require("discord.js");

module.exports = {
	command: "avatar",
	catalog: 2,
	server: [],
	user: [],
	role: [],
	hidden: false,
	description: "Show your avatar",
	parameters: [],
	execute: function(Client, message, args, guildMember) {
		var answers = ["your avatar is *kawaii*! :heart_eyes: **No homo tho**",
			"I like your avatar! :smirk: ",
			"nice avatar! :ok_hand: ",
			"well well.. :smirk: ",
			"damn, I can't handle your avatar :scream: ",
			":eyes: just... woah..",
			"hey beauty.. what's your number :wink:",
			"did the sun just come out or did you just smile at me?",
			"what time do you have to be back in heaven?",
			"if you were a tree, I'w like totally be into trees",
			"you dropped something... my jaw"];
			
		message.delete();
		
		const answer = answers[Math.floor(Math.random()*answers.length)];
		
		const embed = new Discord.RichEmbed()
			.setTitle(`🖼 ${message.author.username}, ${answer}`)
			.setImage(message.author.avatarURL);
			
		if(message.guild.members.get(message.author.id).roles.find("name",`${message.author.id}`)){
			embed.setColor(message.guild.members.get(message.author.id).roles.find("name",`${message.author.id}`).hexColor);
		}
		
		message.channel.send({embed});
	}
}    