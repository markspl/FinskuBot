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
		message.delete();
		message.reply("your avatar is *kawaii*! :heart_eyes: *No homo tho*\n" + message.author.avatarURL);
	}
}    