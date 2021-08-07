import { Command, MessageEmbed, DiscordAPIError } from "discord.js";
import axios from "axios";

interface PistonLang {
  name: string;
  aliases: string[];
  version: string;
}

interface PistonOptions {
  language: string;
  source: string;
  stdin?: string;
  args?: string[];
}

interface PistonOutput {
  ran: boolean;
  language: string;
  version: string;
  output: string;
  stdout: string;
  stderr: string;
}

export = <Command>{
  name: "run",
  description: "Runs a snippet of code.",
  usage: `${process.env.BOT_PREFIX}run language [args...]\n\\\`\\\`\\\`[language]\ncode\n\\\`\\\`\\\``,
  execute: async (message, args) => {
    if (!args[0])
      return await message.channel.send(
        "You need to provide a language! For a list of langauges, use `langs` as the language parameter."
      );

    if (args[0] == "langs") {
      message.channel.sendTyping();
      const langsRes = await axios.get(
        "https://emkc.org/api/v1/piston/versions"
      );
      const langsEmbed = new MessageEmbed().setTitle("Supported Languages");
      let langsEmbedDescription = "";
      for (const lang of <PistonLang[]>langsRes.data)
        langsEmbedDescription += `\`${lang.name}\`, `;
      langsEmbed.setDescription(langsEmbedDescription.slice(0, -2));
      return await message.channel.send({ embeds: [langsEmbed] });
    }

    message.channel.sendTyping();
    const lang = args.shift();
    const langArgs = args;
    const code = message.content.match(/```[a-zA-Z]*\n([\s\S]*?)```/);
    if (!code)
      return await message.channel.send("You need to provide code to execute!");

    try {
      const { data: execRes }: { data: PistonOutput } = await axios.post(
        "https://emkc.org/api/v1/piston/execute",
        <PistonOptions>{
          language: lang,
          source: code[1],
          args: langArgs,
        }
      );

      if (!execRes.stderr)
        if (!execRes.stdout)
          return await message.reply(
            `Your code ran successfully but didn't have any output! If this is unexpected, please note that there are some limitations to using this command due to security reasons. To see a full list of limitations, check out <https://github.com/engineer-man/piston#security>`
          );
        else
          return await message.reply(
            `Your code ran successfully! Output:\n\`\`\`\n${execRes.output}\`\`\``
          );
      else if (execRes.stderr == "Killed")
        return await message.reply(
          `Your code was killed since it ran for more than 3 seconds. Output:\n\`\`\`\n${execRes.output}\`\`\``
        );
      else
        return await message.reply(
          `Your code errored out! Output:\n\`\`\`\n${execRes.output}\`\`\``
        );
    } catch (e) {
      if (e instanceof DiscordAPIError) {
        switch (e.code) {
          case 50035:
            return await message.reply(
              `Your program's output exceeded 2000 characters and couldn't be sent.`
            );
          default:
            return await message.reply(
              `The Discord API returned an error - please notify the bot devs! (Code: ${e.code})`
            );
        }
      }

      switch (<string>e.response.data.message) {
        case "Unsupported language supplied":
          return await message.reply(
            `That language isn't supported. Pass \`langs\` as the language parameter to get a list of all supported languages.`
          );
        default:
          return await message.reply(
            `The Piston API returned an error - please notify the bot devs! (Error Message: ${e.request.data.message})`
          );
      }
    }
  },
};
