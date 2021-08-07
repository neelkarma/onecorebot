import { Command, MessageEmbed, Tag } from "discord.js";

export = <Command>{
  name: "tags",
  description: "Get a list of all tags.",
  usage: `${process.env.BOT_PREFIX}tags`,
  execute: async (message) => {
    const tagsEmbed = new MessageEmbed().setTitle("Tag List");
    let tagsEmbedDescription = "";
    message.client.tags.each(
      (tag: Tag) => (tagsEmbedDescription += `\`${tag.name}\`\n`)
    );
    tagsEmbed.setDescription(tagsEmbedDescription.trim());
    return await message.channel.send({ embeds: [tagsEmbed] });
  },
};
