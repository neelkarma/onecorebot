import type { Command } from "discord.js";

export = <Command>{
  name: "tag",
  description: "Gets the content of a tag",
  usage: `${process.env.BOT_PREFIX}tag tagName`,
  execute: async (message, args) => {
    if (!args[0])
      return await message.reply(
        `You didn't provide a tag! Use \`${process.env.BOT_PREFIX}tags\` to get a full list of tags.`
      );

    if (!message.client.tags.has(args[0]))
      return await message.reply(
        `That tag doesn't exist! Use \`${process.env.BOT_PREFIX}tags\` to get a full list of tags.`
      );

    return await message.reply(message.client.tags.get(args[0])!.content);
  },
};
