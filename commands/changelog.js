/**
 * FinskuBot - changelog
 * Author: Markus (github/markspl)
 * 
 * Show changelog link
 */

module.exports = {
	command: "changelog",
	catalog: 1,
	server: [],
	user: [],
	role: [],
	hidden: false,
	description: "Gives GitHub link",
	parameters: [],
	execute: function(Client, message, args, guildMember) {

		const message = "🔖 **Changelog:**\n**Check changelog here:**\n<https://github.com/markspl/FinskuBot/blob/master/CHANGELOG.md>";

		message.channel.send(log);
	}
}