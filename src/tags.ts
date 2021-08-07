import { Collection, Tag } from "discord.js";

export default new Collection<string, Tag>(
  [
    {
      name: "codeblocks",
      content:
        '**Codeblocks:**\n\\`\\`\\`language\ncode\n\\`\\`\\`\nFor example:\n\\`\\`\\`python\nprint("Hello world!")\n\\`\\`\\`\nbecomes\n```python\nprint("Hello world!")```\n**Inline Codeblocks:**\n\\`code\\` becomes `code`.\n\n> Every time you use backticks in Discord, you save a life.\n*- Ben Awad, 2021*',
    },
    {
      name: "spoonfeeding",
      content:
        "No spoonfeeding is allowed in this server. We're here to learn, not to copy and paste.",
    },
    {
      name: "tias",
      content: "https://tryitands.ee/",
    },
  ].map((tag) => [tag.name, tag])
);
