import * as Discord from "discord.js";
import { config as dotenv } from "dotenv";
import { readdirSync } from "fs";
import tagsArray from "./tags";
import { createServer } from "http";
dotenv({ path: "../.env" });

createServer((req, res) => {
  res.end("Request Successful");
}).listen(process.env.PORT ?? 8000);

const client = new Discord.Client({
  ws: { intents: ["GUILD_MESSAGES", "GUILDS"] },
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
client.tags = new Discord.Collection<string, Discord.Tag>();

const commandFiles = readdirSync("./commands/").filter((file) =>
  file.endsWith(".ts")
);

commandFiles.forEach((file) => {
  const command: Discord.Command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
});

tagsArray.forEach((tag) => {
  client.tags.set(tag.name, tag);
});

client.once("ready", async () => {
  client.user?.setPresence({
    activity: {
      name: `for messages starting with "${process.env.BOT_PREFIX}"`,
      type: "WATCHING",
    },
    status: "online",
  });
  return console.log("Bot ready!");
});

client.on("message", async (message) => {
  if (message.author.bot) return;

  if (hiTests.some((test) => test.test(message.content.toLowerCase())))
    return await message.channel.send("Hi!");
  if (byeTests.some((test) => test.test(message.content.toLowerCase())))
    return await message.channel.send("Bye!");

  if (message.content == "^-^") return await message.channel.send("^-^");
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
    return await message.channel.send(
      `${message.author}, something unexpected happened and I wasn't able to execute your command.`
    );
  }
});

client.login(process.env.BOT_TOKEN);
