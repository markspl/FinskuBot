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
		var start = Date.now();
		var stop, diff;
		message.channel.send(":bell: **Pong!** (*calculating*)").then(function(newMessage){
			var stop = Date.now();
			var diff = (stop - start);
			newMessage.edit(":bell: **Pong!** (" + diff + "ms)").then(m => m.delete(30000));
		});
	}
}