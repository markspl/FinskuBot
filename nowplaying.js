// NOWPLAYING /////////////////////////////////////////////////////////////////////////////////////

process.title = "FinskuBot - NowPlaying";

var fs = require("fs"),
	tmi = require("tmi.js"),
	Finskubot = require("./finskubot.js"),
	Config = require("./config.json");

var options = Config.twitch_options;

var twitchClient = new tmi.client(options);
twitchClient.connect();

twitchClient.addListener("message", function(channel,user,message,self){
	if(message.match(/^Now Playing:/) && user["username"] == "monstercat"){	
		//console.log("Debug:" + message);
	
		if(message.includes(" - ")){
			message = message.substring(0, message.indexOf(" - "));
		}
		
		let args = message.split(" by ");
		var song = args[0];
		var artist = args[1];
		song = song.split(" ");
		song.splice(0,2);
		song = song.join(" ");
		
		Finskubot.nowplaying(song,artist);
	}
});

exports.disconnect = function disconnect(){
	twitchClient.disconnect();
	twitchClient.connect();
}


twitchClient.on("connecting", function(address,port){
	console.log("# [TWITCH] Connecting to Monstercat chat ...");
});
	
twitchClient.on("connected", function(address, port){
	console.log("# [TWITCH] Connected to Monstercat chat!");
});

twitchClient.on("disconnected", function(reason){
	console.log("# [TWITCH] Disconnected!\n" + reason.stack);
});

twitchClient.on('crash', function () {
	chatNotice('# [TWITCH] Crashed', 10000, 4, 'chat-crash');
});

twitchClient.on('connectfail', function () {
	if(showConnectionNotices) chatNotice('# [TWITCH] Connection failed. I try again...', 1000, 3, 'chat-connection-bad-fail');
});