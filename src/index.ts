import { Client, Events, GatewayIntentBits } from "discord.js";
import { ingest, checkId } from "./commands";
import { registerCommands } from "./utils/discord";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.InteractionCreate, async (interaction) => {
  ingest.interaction(interaction);
  checkId.interaction(interaction);
});

client.on("clientReady", async () => {
  if (!client?.user?.id) return;
  console.log(`Application ${client?.application?.id}`);
  console.log(`Logged in as ${client?.user?.tag}!`);

  await registerCommands(client?.user?.id);
});

client.login(process.env.API_KEY);
