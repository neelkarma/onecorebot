import { Command, MessageEmbed } from "discord.js";

export = <Command>{
  name: "tags",
  description: "Get a list of all tags.",
  usage: `${process.env.BOT_PREFIX}tags`,
  execute: async (message, _args, client) => {
    const tagsEmbed = new MessageEmbed().setTitle("Tag List");
    let tagsEmbedDescription = "";
    client.tags.each((tag) => (tagsEmbedDescription += `\`${tag.name}\`\n`));
    tagsEmbed.setDescription(tagsEmbedDescription.trim());
    return await message.channel.send(tagsEmbed);
  },
};
