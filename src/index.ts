import {
  Client,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
} from "discord.js";
import { ingest } from "./commands";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const GUILD_ID = process.env.GUILD_ID!;
const TOKEN = process.env.API_KEY!;

const commands = [ingest.command];

async function registerCommands(clientId: string) {
  const rest = new REST().setToken(TOKEN);

  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const data = (await rest.put(
      Routes.applicationGuildCommands(clientId, GUILD_ID),
      { body: commands }
    )) as object[];

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  ingest.interaction(interaction);
});

client.on("ready", async () => {
  if (!client?.user?.id) return;
  console.log(`Application ${client?.application?.id}`);
  console.log(`Logged in as ${client?.user?.tag}!`);

  await registerCommands(client?.user?.id);
});

client.login(TOKEN);
