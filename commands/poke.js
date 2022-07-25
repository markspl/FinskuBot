/**
 * FinskuBot - poke
 * Author: Markus (github/markspl)
 * 
 * Poke tagged user
 */

module.exports = {
	command: "poke",
	catalog: 2,
	server: [],
	user: [],
	role: [],
	hidden: false,
	description: "Poke other users",
	parameters: ["@username"],
	execute: function(Client, message, args, guildMember) {
		
		if(!args[0]){
			message.delete();
			message.reply("Use @tag to poke right user").then(m => m.delete(5000));
			
			return;
		}else if(args[0]){
			message.delete();
			message.channel.send("👉 <@" + message.author.id + "> pokes " + args[0] + " !").then(m => m.delete(60000));
		}
	}
}