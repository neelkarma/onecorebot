import type { Tag } from "discord.js";
export default <Tag[]>[
  {
    name: "codeblocks",
    content:
      'Use codeblocks for formatting code:\n\\`\\`\\`<language name>\n<your code here>\n\\`\\`\\`\n\nFor example:\n\\`\\`\\`python\nif True:\n\tprint("Hi!")\n\\`\\`\\`\n\nProduces:\n```python\nif True:\n\tprint("Hi!")\n```',
  },
  {
    name: "spoonfeeding",
    content:
      "No spoonfeeding is allowed in this server. We're here to learn, not to copy and paste.",
  },
];
