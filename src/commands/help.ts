import { Command, MessageEmbed } from "discord.js";

export = <Command>{
  name: "help",
  description: "Shows every command.",
  execute: async (message, _args, client) => {
    let helpEmbed = new MessageEmbed().setTitle("Command List");
    let helpEmbedDescription = "";
    client.commands.each(
      (command) =>
        (helpEmbedDescription += `\`${process.env.BOT_PREFIX}${command.name}\` - ${command.description}\n`)
    );
    helpEmbed.setDescription(helpEmbedDescription.trim());
    return await message.channel.send(helpEmbed);
  },
};
