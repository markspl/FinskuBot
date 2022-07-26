/**
 * FinskuBot - server
 * Author: Markus (github/markspl)
 * 
 * Does not work (npm-request discontinued)
 * Check if Minecraft server is running using MCAPI
 */

const Config = require("../config.json");

module.exports = {
	command: "server",
	catalog: 2,
	server: [Config.discord_options.bot_homeserver],
	user: [],
	role: [],
	hidden: false,
	description: "Näe palvelimen tiedot",
	parameters: ["ip"],
	execute: function(Client, message, args, guildMember) {

		const minecraft_ip = "ip-address:25565";
		
		let ip = Config.discord_options.minecraft_ip;
		var request = require('request');
		
		if(args[1] == "ip"){
						
			if(!ip){
				message.channel.send("**IP osoite puuttuu!**").then(m => m.delete(5000));
			} else {
				message.channel.send("🔗 IP: *" + Config.discord_options.minecraft_ip + "*");
			}
			
		}
		
		if(args[1] && args[1] != "ip"){
			message.channel.send("*Nyt en kyllä ymmärtänyt, kokeile uudelleen*").then(m => m.delete(5000));
		}
		
		if(!args[1]){
			
			var url = "https://mcapi.us/server/status?ip=" + ip;
			request(url, function(err, response, body){
				if(err){
					console.log(err);
					message.channel.send("*En löytänyt mitään tietoa serveristä*").then(m => m.delete(10000));
				}
				body = JSON.parse(body);
				
				if(body.online == true){
					
					var serverstatus = "<:minecraft:360008113321017345> **" + body.motd + "**";
					
					serverstatus += "\n✅ Avoinna";
					
					if(body.players.now > 1){
						serverstatus += "\n👤";
					} else {
						serverstatus += "\n👥";
					} 
					
					serverstatus += " Pelaajia: *" + body.players.now + "*/*" + body.players.max + "*";
					serverstatus += "\nℹ Versio: *" + body.server.name + "*";
					
					serverstatus += "\n🔗 IP: *" + ip + "*";
					
				} else if(body.online === false){
					
					var serverstatus = "<:minecraft:360008113321017345> **Serveri on kiinni**";

				} else {
					serverstatus += "\n❓ *Nyt en kyllä tiedä...*";
				}
				
				message.channel.send(serverstatus).then(m => m.delete(3600000));
				
			});
		}
	}
}