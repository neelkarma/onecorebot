import { Command, MessageEmbed } from "discord.js";
import { wait } from "../util";

export = <Command>{
  name: "help",
  description: "This command helps.",
  usage: `${process.env.BOT_PREFIX}help [command]`,
  execute: async (message, args) => {
    const prankMessage = await message.channel.send(
      "Help? Only God can help you, and possibly yourself."
    );
    await wait(4000);
    const prankMessage2 = await message.channel.send("jk lol");
    await wait(500);
    await Promise.all([prankMessage.delete(), prankMessage2.delete()]);

    if (!args[0]) {
      const helpEmbed = new MessageEmbed().setTitle("Command List");
      let helpEmbedDescription = "";
      message.client.commands.each(
        (command: Command) =>
          (helpEmbedDescription += `\`${process.env.BOT_PREFIX}${command.name}\` - ${command.description}\n`)
      );
      helpEmbed.setDescription(helpEmbedDescription.trim());
      return await message.channel.send({ embeds: [helpEmbed] });
    }
    if (!message.client.commands.has(args[0]))
      return await message.channel.send(
        `That command doens't exist! Use \`${process.env.BOT_PREFIX}help\` by itself for a full list of commands.`
      );
    const helpCommand = message.client.commands.get(args[0])!;
    return await message.channel.send(
      `\`${process.env.BOT_PREFIX}${helpCommand.name}\` - *${helpCommand.description}*\n__**Usage:**__\n${helpCommand.usage}`
    );
  },
};
