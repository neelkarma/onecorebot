import { Message } from "discord.js";

declare module "discord.js" {
  export interface Client {
    commands: Collection<unknown, Command>;
    tags: Collection<unknown, Tag>;
  }
  export interface Command {
    name: string;
    description: string;
    usage: string;
    execute: <T>(message: Message, args: string[]) => Promise<T>;
  }
  export interface Tag {
    name: string;
    content: string;
  }
}
