import { Client, Events, GatewayIntentBits } from "discord.js";
import { ingest } from "./commands";
import { registerCommands } from "./helpers";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.InteractionCreate, async (interaction) => {
  ingest.interaction(interaction);
});

client.on("ready", async () => {
  if (!client?.user?.id) return;
  console.log(`Application ${client?.application?.id}`);
  console.log(`Logged in as ${client?.user?.tag}!`);

  await registerCommands(client?.user?.id);
});

client.login(process.env.API_KEY);
