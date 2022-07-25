/**
 * FinskuBot - ping
 * Author: Markus (github/markspl)
 * 
 * Ping Pong! (Get how long it took to send the response)
 */

module.exports = {
	command: "ping",
	catalog: 1,
	server: [],
	user: [],
	role: [],
	hidden: false,
	description: "Test your connection",
	parameters: [],
	execute: function(Client, message, args, guildMember) {
		message.delete();
		const start = Date.now();
		
		// Check first time, and calculate how long it took
		message.channel.send(":bell: **Pong!** (*calculating*)").then(function(newMessage){
			const stop = Date.now();
			const diff = (stop - start);
			newMessage.edit(":bell: **Pong!** (" + diff + "ms)").then(m => m.delete(30000));
		});
	}
}