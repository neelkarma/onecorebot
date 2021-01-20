declare module "discord.js" {
  export interface Client {
    commands: Collection<unknown, Command>;
    tags: Collection<unknown, Tag>;
  }
  export interface Command {
    name: string;
    description: string;
    execute: (message: Message, args: string[], client: Client) => any;
  }
  export interface Tag {
    name: string;
    content: string;
  }
}
