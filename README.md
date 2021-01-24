# ONECORE Bot
The official(?) Discord bot for the ONECORE Discord server.

## Hosting
### Requirements
- Git
- NodeJS (v14.15.4 minimum)
- `npm`
### The Steps
1. `git clone https://github.com/neelkarma/onecorebot.git`
2. `cd onecorebot`
3. `npm i`
4. `npm run build`
5. Create a `.env` file in the root of `onecorebot` and fill in the following:
```
BOT_TOKEN=(bot token)
BOT_PREFIX=(desired bot prefix)
WELCOME_CHANNEL_ID=(the id of the desired welcome channel)
RULES_CHANNEL_ID=(the id of the desired rules channel)
```
6. `npm start`

## Developers
### Requirements
- Git
- NodeJS (v14.15.4 minimum)
- `npm`
### Getting Started
1. `git clone https://github.com/neelkarma/onecorebot.git`
2. `cd onecorebot`
3. `npm i`
4. Create a `.env` file in the root of `onecorebot` and fill in the following:
```
BOT_TOKEN=(bot token)
BOT_PREFIX=(desired bot prefix)
WELCOME_CHANNEL_ID=(the id of the desired welcome channel)
RULES_CHANNEL_ID=(the id of the desired rules channel)
```
### NPM Scripts
- `npm start` - Starts the bot. Make sure you've run `npm run build` first!
- `npm run build` - Transpiles the source TypeScript into JavaScript in the `/dist/` directory.
- `npm run watch` - Same as `npm run build`, but reruns when a file change is detected.
- `npm run format` - Formats the code with Prettier.
### Additional Information
- It's recommended to use a text editor that supports LSP or `tsserver` to reap the benefits of autocompletion and other useful features.
