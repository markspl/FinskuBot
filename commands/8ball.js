/**
* FinskuBot - 8ball
* Author: Markus (github/markspl)
*
* Ask advice from 8-ball
*/

const Discord = require("discord.js");

module.exports = {
	command: "8ball",
	catalog: 2,
	server: [],
	user: [],
	role: [],
	hidden: false,
	description: "Ask advices from Magic 8-ball 🎱",
	parameters: [],
	execute: function (Client, message, args, guildMember) {

		if (!args[0]) return message.reply("to seek advice from Magic 8-ball you have to ask *something* 🎱");

		const question = args.join(" ");

		// Responses
		const answers = [
			"Signs point to yes",
			"Without a doubt",
			"Yes definitely",
			"You may rely on it",
			"As I see it, yes",
			"Most likely",
			"Outlook good",
			"Yes",
			"Reply hazy try again",
			"Ask again later",
			"Better not tell you now",
			"Cannot predict now",
			"Concentrate and ask again",
			"Don't count on it",
			"My reply is no",
			"My sources say no",
			"Outlook not so good",
			"Very doubtful"];

		// Pick one reply randomly
		const answer = answers[Math.floor(Math.random() * answers.length)];

		// Reply using Discord's Rich Embed
		const embed = new Discord.RichEmbed()
			.addField(`🎱 ${answer}`, `${message.author.tag} asked\n*"${question}"*`)
			.setColor("#6800a5")
		//.setThumbnail(message.author.avatarURL);

		message.channel.send({ embed });
	}
}