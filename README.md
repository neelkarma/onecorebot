# ONECORE Bot

The official(?) Discord bot for the ONECORE Discord server.

## Hosting

1. Make sure Git, NodeJS (Latest, not LTS) and Yarn are installed.
2. Run these commands:

```sh
git clone https://github.com/neelkarma/onecorebot.git
cd onecorebot
yarn install
```

3. Create a `.env` file and fill in the following:

```
BOT_TOKEN=(bot token)
BOT_PREFIX=(desired bot prefix)
WELCOME_CHANNEL_ID=(the id of the desired welcome channel)
RULES_CHANNEL_ID=(the id of the desired rules channel)
PORT=(web server port)
```

4. `yarn start`

## Developers

1. Follow the hosting instructions but without step 4.

### Yarn Scripts

- `yarn start` - Starts the bot.
- `yarn dev` - Starts the bot and restarts when a change to the source code is detected.
- `yarn format` - Formats the code with Prettier.
- `yarn lint` - Lints the code with `tsc`.

## License

Licensed under [DBAD](./LICENSE)
