import * as Discord from "discord.js";
import { config as dotenv } from "dotenv";
import { readdirSync } from "fs";
import tags from "./tags";
import { createServer } from "http";
dotenv({ path: "../.env" });

createServer((_, res) => {
  res.end("Request Successful");
}).listen(process.env.PORT ?? 8000);

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS],
});

const hiTests: RegExp[] = [/^hi/, /^hello/, /^heya/];
const byeTests: RegExp[] = [
  /^bye/,
  /^bai/,
  /^goodbye/,
  /^goobai/,
  /^cya/,
  /^see you/,
  /^see ya/,
];

client.commands = new Discord.Collection<string, Discord.Command>();
client.tags = tags;

const commandFiles = readdirSync("./commands/").filter((file) =>
  file.endsWith(".ts")
);

commandFiles.forEach((file) => {
  const command: Discord.Command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
});

client.once("ready", async () => {
  client.user?.setPresence({
    activities: [
      {
        name: `for messages starting with "${process.env.BOT_PREFIX}"`,
        type: "WATCHING",
      },
    ],
    status: "online",
  });
  return console.log("Bot ready!");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (hiTests.some((test) => test.test(message.content.toLowerCase()))) {
    message.channel.send("Hi!");
    return;
  }

  if (byeTests.some((test) => test.test(message.content.toLowerCase()))) {
    message.channel.send("Bye!");
    return;
  }

  if (message.content == "^-^") {
    await message.channel.send("^-^");
    return;
  }

  if (!message.content.startsWith(process.env.BOT_PREFIX!)) return;

  const args = message.content
    .split("\n")[0]
    .slice(process.env.BOT_PREFIX!.length)
    .trim()
    .split(/ +/);

  const commandName = args.shift()!.toLowerCase();

  if (!client.commands.has(commandName)) return;

  try {
    client.commands.get(commandName)!.execute(message, args);
  } catch (e) {
    console.error(e);
    await message.reply(
      "Something unexpected happened and I wasn't able to execute your command."
    );
  }
});

client.login(process.env.BOT_TOKEN);
