module.exports = {
	command: "bot",
	catalog: 1,
	server: [],
	user: ["210125258034905089"],
	role: [],
	hidden: false,
	description: "[A] Control bot",
	parameters: ["reload <command>","reboot","kill"],
	execute: function (Client, message, args, guildMember){
		message.delete();
		var exec = require('child_process').exec, child;
		
		if(args[0] == "reload"){
			console.time('# Loading');
			
			if(args[1] && Client.commands[args[1]]){
				message.channel.send("♻ **Reloading command " + args[1] + " ...**").then(m => m.delete(5000));
				console.log("# Reloading command " + args[1]);
				Client.load(args[1]);
				message.channel.send("♻ **Reloaded command " + args[1] + " !**");
			}else if(!args[1]){
				message.channel.send("♻ **Reloading commands ...**").then(m => m.delete(5000));
				console.log("# Reloading commands ... ");
				Client.load();
				message.channel.send("♻ **Reloaded commands !**");
			}else{
				message.channel.send("⚠ Can't find command " + args[1]).then(m => m.delete(10000));
				return;
			}
			 
			console.timeEnd('# Loading');
			console.log("# Reloaded!");
			
		}else if(args[0] == "reboot"){
			
			/*if(args[1] == "nowplaying"){
			
				child = exec("pm2 restart nowplaying",
				function (error, stdout, stderr){
					console.log('stdout: ' + stdout);
					console.log("stderr: " + stderr);
					if (error !== null){
						console.log("exec error: " + error);
					}
				});
				
				return; 
			}*/
			
			message.channel.send("⚠ Rebooting bot...");//.then(m => m.delete(2000));
			
			/*child = exec("pm2 restart nowplaying",
				function (error, stdout, stderr){
					console.log('stdout: ' + stdout);
					console.log("stderr: " + stderr);
					if (error !== null){
						console.log("exec error: " + error);
					}
				});*/
			
			child = exec("pm2 restart finskubot",
				function (error, stdout, stderr){
					console.log('stdout: ' + stdout);
					console.log("stderr: " + stderr);
					if (error !== null){
						console.log("exec error: " + error);
					}
				});
				
		}else if(args[0] == "kill"){
			message.channel.send("👀 Killing FinskuBot...");//.then(m => m.delete(2000));
			
			/*child = exec("pm2 stop nowplaying",
				function (error, stdout, stderr){
					console.log('stdout: ' + stdout);
					console.log("stderr: " + stderr);
					if (error !== null){
						console.log("exec error: " + error);
					}
				});*/
			
			child = exec("pm2 stop finskubot",
				function (error, stdout, stderr){
					console.log('stdout: ' + stdout);
					console.log("stderr: " + stderr);
					if (error !== null){
						console.log("exec error: " + error);
					}
				});
				
		}else{
			var response = "⚠ Use reload parameters\n";
			response += "`reload <command>` - Reload(s) command file(s)\n`reboot` - Reboot the bot\n`kill` - Kills the bot";
			message.channel.send(response).then(m => m.delete(60000));
		}
	}
}