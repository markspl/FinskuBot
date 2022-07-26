# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

\-

## [0.7.4] - 2022-07-26
### Added
- Add start script

### Changed
- Update README with instructions and other information
- Show #000 correctly. Make structure simplier
- Show custom role color correctly
- Comment disabled commands
- Clean config file
- Rewrite and enable command request
- Allow multiple users and roles rights for commands
- Fix user information fetch
- Change variable to correct one
- Clean, refactor and add comments
- Code cleaning and commenting
- Fix security vulnerabilities by removing npm package 'request'

### Removed
- Remove PM2 features ('reboot', 'kill')
- Remove feature nowplaying

## [0.7.3] - 2018-03-21
### Added
- Added missing fields in package.json
- Added a DEV mode

### Changed
- Updated Discord.js
- Color requests `!request color` works now with roles named with color codes, not with user IDs
- Fixed `!request role` command. Didn't find the roles if user didn't use uppercase letters
- Moved `changelog.js` to /disabled-commands/

## [0.7.2] - 2017-11-09
### Added
- Added command '!8ball'
- Added command '!userinfo'
- Added random answers for command '!avatar'
- Added two variables in 'config.json' file (bot_owner, bot_homeserver)

### Changed
- Changed command '!avatar' look
- Changed command '!changelog' answer and description
- Changed API address in 'finskubot.js' file
- Changed filetypes from ANSI to UTF8
- Changed ANSI codes to UTF8 codes
- Changed user IDs and guild IDs and added these informations in 'config.json' file

### Removed
- Removed file 'changelog.json'
- Removed useless texts and codes from files

## 0.7.1 - 2017-11-08
### Added
- Finally first GitHub commit! (https://github.com/markspl/FinskuBot)
- Added CHANGELOG.md
- Added README.md
- Added config-example.json

### Removed
- Removed useless files
- Cleaned rotten codes...

## 0.7 - 2017-11-04
### Added
- Show what's playing on Monstercat Twitch stream (WIP)

## 0.6.1 - 2017-10-28
### Changed
- Command '!request' needs role '@👤 Member'

## 0.6 - 2017-10-28
### Added
- Added new command '!request'
- Added new command '!broadcast'
- Added new command data 'role'

## Changed
- Changed '!monstercat' -> '!notify'
- Disabled '!server' command

## 0.5.1 - 2017-10-13
### Changed
- Small fixes for '!guildinvite' and '!monstercat')
- '!changelog' always requires when using the command

## 0.5 - 2017-10-13
### Added
- Modularity! Each command has own .js file
- Added new features for command '!monstercat'
- Added new command data 'catalog'

### Changed
- Multiple small fixes
- Updated '!ping'

## 0.4 - 2017-10-08
### Added
- Added '!monstercat' command

### Changed
- Edited '!bot' command's timeouts

## 0.3 - 2017-10-07
### Added
- Added command '!poke'
- Added timeouts for messages

## 0.2 - 2017-10-04
### Added
- Added two command datas 'user' and 'hidden'
- Added new command '!bot' (Only for specific people)
- Added ready and error messages in channel '#finskubot'

### Changed
- Using '!finskubot' user can see only commands what user could use
- Updated '!guildinvite' invite address

## 0.1.1 - 2017-10-03
### Added
- Created changelog.json
- Added new command: '!changelog'
- Changed '!server' IP address

### Changed
- Made server command easier to modify
- Bot automatically removes command messages

## 1.0.0 - 2017-06-20
### Added
- New visual identity by @tylerfortune8.

### Changed
- Start using 'changelog' over 'change log' since it's the common usage.

### Removed
- Section about 'changelog' vs 'CHANGELOG'.

[Unreleased]: https://github.com/markspl/FinskuBot/compare/v0.7.2...HEAD
[0.7.2]: https://github.com/markspl/FinskuBot/compare/v0.7.1...v0.7.2
