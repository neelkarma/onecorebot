# ONECORE Bot

The official(?) Discord bot for the ONECORE Discord server.

## Hosting

### Requirements

- Git
- NodeJS (v14.15.4 minimum)
- `yarn`

### The Steps

1. `git clone https://github.com/neelkarma/onecorebot.git`
2. `cd onecorebot`
3. `yarn install`
4. Create a `.env` file in the root of `onecorebot` and fill in the following:

```
BOT_TOKEN=(bot token)
BOT_PREFIX=(desired bot prefix)
WELCOME_CHANNEL_ID=(the id of the desired welcome channel)
RULES_CHANNEL_ID=(the id of the desired rules channel)
```

5. `yarn start`

## Developers

### Requirements

- Git
- NodeJS (v14.15.4 minimum)
- `yarn`

### Getting Started

1. `git clone https://github.com/neelkarma/onecorebot.git`
2. `cd onecorebot`
3. `yarn install`
4. Create a `.env` file in the root of `onecorebot` and fill in the following:

```
BOT_TOKEN=(bot token)
BOT_PREFIX=(desired bot prefix)
WELCOME_CHANNEL_ID=(the id of the desired welcome channel)
RULES_CHANNEL_ID=(the id of the desired rules channel)
```

5. Happy hacking!

### NPM Scripts

- `yarn start` - Starts the bot.
- `yarn run dev` - Starts the bot and restarts when a change to the source code is detected.
- `yarn run format` - Formats the code with Prettier.
- `yarn run lint` - Uses ESLint to lint and fix code.

### Additional Information

- It's recommended to use a text editor or plugin that supports TypeScript to reap the benefits of autocompletion and other useful features.

## License

Licensed under [DBAD](./LICENSE)
