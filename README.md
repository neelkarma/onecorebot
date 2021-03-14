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
4. Create a `.env` file in the root of `onecorebot` and fill in the following:

```
BOT_TOKEN=(bot token)
BOT_PREFIX=(desired bot prefix)
WELCOME_CHANNEL_ID=(the id of the desired welcome channel)
RULES_CHANNEL_ID=(the id of the desired rules channel)
```

5. `npm start`

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

5. Happy hacking!

### NPM Scripts

- `npm start` - Starts the bot.
- `npm run dev` - Starts the bot and restarts when a change to the source code is detected.
- `npm run format` - Formats the code with Prettier.
- `npm run lint` - Uses ESLint to lint and fix code.

### Additional Information

- It's recommended to use a text editor that supports LSP or `tsserver` to reap the benefits of autocompletion and other useful features.

## License

Licensed under [DBAD](./LICENSE)
