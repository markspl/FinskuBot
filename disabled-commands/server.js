const Config = require("../config.json");

module.exports = {
	command: "server",
	catalog: 2,
	server: ["358690414557003791"],
	user: [],
	role: [],
	hidden: false,
	description: "NÃ¤e palvelimen tiedot",
	parameters: ["ip"],
	execute: function(Client, message, args, guildMember) {
		
		let ip = Config.discord_options.minecraft_ip;
		var request = require('request');
		
		if(args[1] == "ip"){
						
			if(!ip){
				message.channel.send("**IP osoite puuttuu!**").then(m => m.delete(5000));
			} else {
				message.channel.send("ðŸ”— IP: *" + Config.discord_options.minecraft_ip + "*");
			}
			
		}
		
		if(args[1] && args[1] != "ip"){
			message.channel.send("*Nyt en kyllÃ¤ ymmÃ¤rtÃ¤nyt, kokeile uudelleen*").then(m => m.delete(5000));
		}
		
		if(!args[1]){
			
			var url = "https://mcapi.us/server/status?ip=" + ip;
			request(url, function(err, response, body){
				if(err){
					console.log(err);
					message.channel.send("*En lÃ¶ytÃ¤nyt mitÃ¤Ã¤n tietoa serveristÃ¤*").then(m => m.delete(10000));
				}
				body = JSON.parse(body);
				
				if(body.online == true){
					
					var serverstatus = "<:minecraft:360008113321017345> **" + body.motd + "**";
					
					serverstatus += "\nâœ… Avoinna";
					
					if(body.players.now > 1){
						serverstatus += "\nðŸ‘¥";
					} else {
						serverstatus += "\nðŸ‘¤";
					} 
					
					serverstatus += " Pelaajia: *" + body.players.now + "*/*" + body.players.max + "*";
					serverstatus += "\nâ„¹ Versio: *" + body.server.name + "*";
					
					serverstatus += "\nðŸ”— IP: *" + ip + "*";
					
				} else if(body.online === false){
					
					var serverstatus = "<:minecraft:360008113321017345> **Serveri on kiinni**";

				} else {
					serverstatus += "\nðŸ¤· *Nyt en kyllÃ¤ tiedÃ¤...*";
				}
				
				message.channel.send(serverstatus).then(m => m.delete(3600000));
				
			});
		}
	}
}