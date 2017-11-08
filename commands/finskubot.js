const Config = require("../config.json");
const Package = require("../package.json");

module.exports = {
	command: "finskubot",
	catalog: 1,
	server: [],
	user: [],
	role: [],
	hidden: false,
	description: "I'm bot *bzz bzz'z*",
	parameters: [],
	execute: function(Client, message, args, guildMember) {
		message.delete();
		var response = ":robot: **Commands:**";
				
		for (var i = Config.discord_options.catalogs; i >= 0; i--){
			if(i == 2) response += "\n\n**Fun**";
			if(i == 1) response += "\n\n**Utility**";

			for (let command in Client.commands) {
				var c = Client.commands[command];
				
				//if(c.catalog != i) console.log("nope " + c.catalog + "!=" + i);
				if(c.catalog == i){
					if(c.server == message.guild.id || !c.server.length){
						if (c.hidden == false){
							if (c.user == message.author.id || c.user.length === 0){
								response += "\n`" + Config.discord_options.bot_prefix + c.command + "";

								if (c.parameters != 0) {
									response += " [" + c.parameters + "]";
								}

								response += "` : " + c.description;
							}
						}
					}
				}
			}
		}

		message.channel.send(response + "\n\n<:finsku:358003359447252993> *V" + Package.version + "* | *Serving in " + Client.guilds.array().length + " server(s)*")
			.then(m => m.delete(3600000));
	}
}