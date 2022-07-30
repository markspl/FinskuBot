<div align="center">
<img src=https://cdn.discordapp.com/app-icons/299199715495641098/027e6865e21aa4eb5d546e6a0ca05a1e.png?size=128 alt="Bzz bzz"/>
<h2>FinskuBot</h2>
<i>Another stupid Discord bot.</i>
<br>
<img src="https://img.shields.io/github/package-json/v/markspl/FinskuBot" alt="bot version"/>
<a href="https://discord.js.org/#/">
  <img src="https://img.shields.io/github/package-json/dependency-version/markspl/FinskuBot/discord.js?color=5865f2" alt="discord.js version"/>
</a>
<img src="https://img.shields.io/github/directory-file-count/markspl/FinskuBot/commands?extension=js&type=file&label=commands" alt="count of commands"/>
<br>
</div>

## Features
```
### Fun
- 8ball : Ask advices from Magic 8-ball 🎱
- avatar : Show your avatar
- poke [@username] : Poke other users

### Utility (`[A]:For admins`)
- bot [reload <command>] : [A] Control bot
- broadcast [monstercat <link,text>] : [A] Send notifications
- changelog : Gives GitHub link
- finskubot : I'm bot bzz bzz'z
- guildinvite : Invite your slimy friends
- ping : Test your connection
- request [color <#colorcode>] : Request command
- userinfo : Check what informations I can get
```

<hr>

## How-To

Bot can be run as [a) Node application](###a-run-bot-as-node-application), or as [b) Docker container](###b-run-bot-as-docker-container).

>Remember clone the repository  `git clone https://github.com/markspl/FinskuBot.git`

### A) Run bot as Node application

1. Configure `config.json`

- Copy `config-example.json` and rename to `config.json`
```json
{
  "discord_options": {
    "bot_token": "Bot's Discord token (https://discordapp.com/developers)",
    "bot_prefix": "The prefix what your bot uses/listens. I'm using '!'",
    "bot_owner": "The user ID of bot's master without '<@' and '>'",
    "bot_homeserver": "The guild ID of bot's home server without '<@' and '>'",
    "bot_homechannel": "The text channel ID where bot reports bot info"
  }
}
```
- On Discord Developers Portal (https://discordapp.com/developers) create a new Application and get token (`bot_token`)
- `request` custom role colour command works only when configure `SERVER MEMBERS INTENT` on Discord Developers Portal is set on (Bot > "Settings" tab > "Bot" > Privileged Gateway Intents > `SERVER MEMBERS INTENT`)
- `bot_owner` : Some commands are only for the person who runs the bot
- `bot_homeserver` : Some commands are only for the specific server (invite, notify, request)
- `bot_homechannel` : For now, homechannel is required to have

Example `config.json`:
```json
{
  "discord_options": {
    "bot_token": "abcdefg123456...",
    "bot_prefix": "!!",
    "bot_owner": "0123456...",
    "bot_homeserver": "0123456...",
    "bot_homechannel": "0123456..."
  }
}
```

2. Run bot `npm run start` or `node finskubot.js`

<hr>

### B) Run bot as Docker container

This requires [*Docker*](https://www.docker.com/) and [*Docker Compose*](https://docs.docker.com/compose/).

1. Configure `docker-compose.yml`
- Copy `docker-compose-example.yml` and rename it to `docker-compose.yml`
- Configure env values. This is not needed, if `config.yml` file is already configured (the app checks if env values are used):
```yml
...
environment:
  - NODE_ENV=production
  # Token from Discord Developers Portal
  - BOT_TOKEN=TOKEN
  # Token which bot uses (!command)
  - BOT_PREFIX=!
  # User ID who can use 'admin' commands
  - BOT_OWNER=ID
  # Server where bot works
  - BOT_HOMESERVER=ID
  # Channel where bot sends logs/info
  - BOT_HOMECHANNEL=ID
```

2. Run container `docker-compose up`

<hr>

Finally, invite bot using link `https://discordapp.com/oauth2/authorize?client_id=APPLICATIONID&scope=bot&permissions=8`

- where `APPLICATIONID` is bot's ID which can be found from Discord Developers Portal (Bot > "Settings" tab > General Information > Application ID > "COPY")
- Link gives a permission `Administrator` (all permissions)
    - If using different permissions, bot requires at least roles...
        - Manage Roles
        - Read Messages/View Channels
        - Send Messages
        - Manage Messages
        - Use External Emojis

<hr>

## ToDo
- ~~Docker image~~
- Update Discord.js to newer version
