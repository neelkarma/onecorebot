import { Command, MessageEmbed } from "discord.js";

export = <Command>{
  name: "help",
  description: "This command helps.",
  usage: `${process.env.BOT_PREFIX}help [command]`,
  execute: async (message, args, client) => {
    if (!args[0]) {
      const helpEmbed = new MessageEmbed().setTitle("Command List");
      let helpEmbedDescription = "";
      client.commands.each(
        (command) =>
          (helpEmbedDescription += `\`${process.env.BOT_PREFIX}${command.name}\` - ${command.description}\n`)
      );
      helpEmbed.setDescription(helpEmbedDescription.trim());
      return await message.channel.send(helpEmbed);
    }
    if (!client.commands.has(args[0]))
      return await message.channel.send(
        `That command doens't exist! Use \`${process.env.BOT_PREFIX}help\` by itself for a full list of commands.`
      );
    const helpCommand = client.commands.get(args[0])!;
    return await message.channel.send(
      `\`${process.env.BOT_PREFIX}${helpCommand.name}\` - *${helpCommand.description}*\n__**Usage:**__\n${helpCommand.usage}`
    );
  },
};
