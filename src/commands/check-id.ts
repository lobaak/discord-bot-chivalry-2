import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  type CacheType,
  type Interaction,
} from "discord.js";
import db from "../db";

const name = "check-id";

const command = new SlashCommandBuilder()
  .setName(name)
  .setDescription("Check player by PlayerFabID or EOSPlayerID")
  .addStringOption((option) =>
    option
      .setName("id")
      .setDescription("Enter the PlayerFabID or EOSPlayerID to check")
      .setRequired(true)
      .setMinLength(1)
      .setMaxLength(50)
  );

const interaction = async (interaction: Interaction<CacheType>) => {
  if (interaction.isChatInputCommand() && interaction.commandName === name) {
    const id = interaction.options.getString("id");

    const statement = db
      .prepare("SELECT alias FROM aliases WHERE fabid = ? OR eosid = ?")
      .get(id, id);

    if (!statement) {
      await interaction.reply({
        content: `No player found with ID: ${id}`,
        ephemeral: true,
      });
      return;
    }

    console.log(statement);
  }
};

export const checkId = {
  name,
  command,
  interaction,
};
