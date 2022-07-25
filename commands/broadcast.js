/**
 * FinskuBot - broadcast
 * Author: Markus (github/markspl)
 * 
 * Broadcast a message as bot
 */

module.exports = {
	command: "broadcast",
	catalog: 1,
	server: ["342316064711114753"],
	user: [],
	role: ["354574809969197066"],
	hidden: false,
	description: "[A] Send notifications",
	parameters: ["monstercat <link,text>"],
	execute: function (Client, message, args, guildMember) {

		const pingRoleId = "368160456319172610";

		if (!args[0]) {
			// Message missing
			message.delete();
			message.channel.send("️ℹ️ <@" + message.author.id + ">, a link / text missing").then(m => m.delete(10000));
			return;

		} else if (args[0] == "monstercat") {
			// For Monstercat fans
			// Parameter 'monstercat' to share YouTube link or text
			message.delete();

			if (!args[1]) {
				// Missing link or text
				return message.channel.send("️ℹ️ <@" + message.author.id + ">, a link / text missing").then(m => m.delete(10000));
				
			} else if (args[1].startsWith("https://www.youtube.com/watch?v=") || args[1].startsWith("https://youtu.be/")) {
				// Share YouTube link and Discord-pin it
				return message.channel.send(`📍 **New Monstercat video!** <@&${pingRoleId}>\n${args[1]}`).then(m => m.pin());

			} else {
				// Share text and ping specific group
				const broadcast = args.slice(1);
				const notification = broadcast.join(" ");
				message.channel.send(`${notification}\n<@&${pingRoleId}>`);
			}

		} else {
			// Unknown parameter
			message.delete();
			message.channel.send("⚠️ I didn't understand, try again!").then(m => m.delete(10000));
		}
	}
}