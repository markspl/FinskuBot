# ![bzz bzz](https://cdn.discordapp.com/app-icons/299199715495641098/027e6865e21aa4eb5d546e6a0ca05a1e.png?size=64) FinskuBot
*Another stupid Discord bot*.

### Features
>#### Fun
>- 8ball : Ask advices from Magic 8-ball 🎱
>- avatar : Show your avatar
>- poke [@username] : Poke other users
>
>#### Utility (`[A]:For admins`)
>- bot [reload <command>] : [A] Control bot
>- broadcast [monstercat <link,text>] : [A] Send notifications
>- changelog : Gives GitHub link
>- finskubot : I'm bot bzz bzz'z
>- guildinvite : Invite your slimy friends
>- notify [list,role] : Get notifications
>- ping : Test your connection
>- request [color <#colorcode>] : Request command
>- userinfo : Check what informations I can get

### Bot uses...
>- NodeJS
>- [Discord.js](https://discord.js.org/#/) v11

### How-To

✋ **This bot is made to work on one specific Discord guilds.** With a little edits it can be used for other guilds.

1. Clone repository

- `git clone git@github.com:markspl/FinskuBot.git`

2. Configure `config.json`

- Copy `config-example.json` and rename to `config.json`
```json
{
  "discord_options": {
    "bot_token": "Bot's Discord token (https://discordapp.com/developers)",
    "bot_prefix": "The prefix what your bot uses/listens. I'm using '!'",
    "catalogs": "2",
    "bot_owner": "The user ID of bot's master without '<@' and '>'",
    "bot_homeserver": "The guild ID of bot's home server without '<@' and '>'",
    "bot_homechannel": "The text channel ID where bot reports bot info"
  },
  "dev": false
}
```
- On Discord Developers Portal (https://discordapp.com/developers) create a new Application and get token (`bot_token`)
- `request` custom role colour command works only when configure `SERVER MEMBERS INTENT` on Discord Developers Portal is set on (Bot > "Settings" tab > "Bot" > Privileged Gateway Intents > `SERVER MEMBERS INTENT`)
- `catalogs` : Default 2. If more commands and catalogs added, this count can be changed.
- `bot_owner` : Some commands are only for the person who runs the bot
- `bot_homeserver` : Some commands are only for the specific server (invite, notify, request)
- `bot_homechannel` : For now, homechannel is required to have

Example `config.json`:
```json
{
  "discord_options": {
    "bot_token": "abcdefg123456...",
    "bot_prefix": "!!",
    "catalogs": "2",
    "bot_owner": "0123456...",
    "bot_homeserver": "0123456...",
    "bot_homechannel": "0123456..."
  },
  "dev": false
}
```

3. Invite bot using link `https://discordapp.com/oauth2/authorize?client_id=APPLICATIONID&scope=bot&permissions=8`

- where `APPLICATIONID` is bot's ID which can be found from Discord Developers Portal (Bot > "Settings" tab > General Information > Application ID > "COPY")
- Gives permissions `Administrator`. 
    - If using different permissions, bot requires at least roles...
        - Manage Roles
        - Read Messages/View Channels
        - Send Messages
        - Manage Messages
        - Use External Emojis

3. Run bot `npm run start` or `node finskubot.js`

### ToDo
- Docker image
- Update Discord.js to newer version