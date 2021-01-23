import { Command, MessageEmbed } from "discord.js";
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
  execute: async (message, args, _client) => {
    if (!args[0])
      return await message.channel.send(
        "You need to provide a language! For a list of langauges, use `langs` as the language parameter."
      );

    if (args[0] == "langs") {
      message.channel.startTyping();
      const langsRes = await axios.get(
        "https://emkc.org/api/v1/piston/versions"
      );
      let langsEmbed = new MessageEmbed().setTitle("Supported Languages");
      let langsEmbedDescription = "";
      for (const lang of <PistonLang[]>langsRes.data)
        langsEmbedDescription += `\`${lang.name}\`, `;
      langsEmbed.setDescription(langsEmbedDescription.slice(0, -2));
      message.channel.stopTyping();
      return await message.channel.send(langsEmbed);
    }

    message.channel.startTyping();
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
      message.channel.stopTyping();

      if (!execRes.stderr)
        return await message.channel.send(
          `${message.author}, your code ran successfully! Output:\n\`\`\`\n${execRes.output}\`\`\``
        );
      else
        return await message.channel.send(
          `${message.author}, your code errored out! Output:\n\`\`\`\n${execRes.output}\`\`\``
        );
    } catch (e) {
      message.channel.stopTyping();

      switch (<string>e.response.data.message) {
        case "Unsupported language supplied":
          return await message.channel.send(
            "That language isn't supported. Pass `langs` as the language parameter to get a list of all supported languages."
          );
        default:
          return await message.channel.send("Error: " + e.request.data.message);
      }
    }
  },
};
