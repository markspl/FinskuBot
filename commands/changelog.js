module.exports = {
	command: "changelog",
	catalog: 1,
	server: [],
	user: [],
	role: [],
	hidden: false,
	description: "Shows last version's changelog",
	parameters: [],
	execute: function(Client, message, args, guildMember) {
		delete require.cache[require.resolve("../changelog.json")];
		const Changelog = require("../changelog.json");
		
		var log = "🔖 **Changelog:**\n\n";
		
		log += "**" + Changelog.versions[0].version + "** | *" + Changelog.versions[0].date + "*";
		log += "```";
		
		for(var i = 0; i < Changelog.versions[0].changes.length; i++){
			var clog = Changelog.versions[0];
			log += "• " + clog.changes[i] + "\n";				
		}			
		
		log += "```";
		
		message.channel.send(log);
	}
}