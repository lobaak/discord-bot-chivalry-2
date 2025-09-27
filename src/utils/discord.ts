import { REST, Routes } from "discord.js";
import { ingest } from "../commands";

export async function registerCommands(clientId: string) {
  const commands = [ingest.command];

  const rest = new REST().setToken(process.env.API_KEY!);

  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const data = (await rest.put(
      Routes.applicationGuildCommands(clientId, process.env.GUILD_ID!),
      { body: commands }
    )) as object[];

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
}
