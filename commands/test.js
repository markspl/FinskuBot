var Discord = require("discord.js"),
	request = require("request"),
	Config = require("../config.json");

module.exports = {
	command: "test",
	catalog: 1,
	server: [],
	user: [Config.discord_options.bot_owner],
	role: [],
	hidden: true,
	description: "",
	parameters: [""],
	execute: function (Client, message, args, guildMember){
		// latestrelease
		if(args[0] == "latestrelease"){
			var url = "https://connect.monstercat.com/api/catalog/release?limit=1";

			request({
				url: url,
				json: true,
			}, function(error, response, body){
				if(!error && response.statusCode === 200){
					var song = body.results[0].title,
						artist = body.results[0].renderedArtists,
						cover = body.results[0].coverUrl,
						releaseUrl = body.results[0].urls[0];

					cover = cover.replace(/ /g, "%20");
					if(releaseUrl) releaseUrl = releaseUrl.replace(/ /g, "%20");

					const embed = new Discord.RichEmbed()
						.setTitle("🆕 Latest Release")
						.addField(`${song}`,`${artist}`)
						.setImage(`${cover}`);

					if(releaseUrl) embed.setURL(`${releaseUrl}`);
					if(!releaseUrl) embed.addField("Links","None");

					message.channel.send({embed});

				}else console.log(error);
			});

		}else message.channel.send("nope");
	}
}
