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

		var log = "🔖 **Changelog:**\n";
		log += "**Check changelog here:**\n";
		log += "<https://github.com/markspl/FinskuBot/blob/master/CHANGELOG.md>";

		message.channel.send(log);

	}
}