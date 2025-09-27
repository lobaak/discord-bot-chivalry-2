import {
  ActionRowBuilder,
  ModalBuilder,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
  type CacheType,
  type Interaction,
} from "discord.js";
import db from "../db";
import { parsePlayersText } from "../utils/misc";

const name = "ingest";

const command = new SlashCommandBuilder()
  .setName(name)
  .setDescription("Ingest data from your input");

const interaction = async (interaction: Interaction<CacheType>) => {
  if (interaction.isChatInputCommand()) {
    const modal = new ModalBuilder().setCustomId("modal").setTitle("Ingest");

    const input = new TextInputBuilder()
      .setCustomId("textInput")
      .setLabel("Paste the response of /listplayers command")
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder(
        "Paste the response of /listplayers command from Chivalry 2 console here..."
      )
      .setRequired(true)
      .setMinLength(1)
      .setMaxLength(4000);

    // Create action rows (each text input needs its own row)
    const firstActionRow =
      new ActionRowBuilder<TextInputBuilder>().addComponents(input);

    modal.addComponents(firstActionRow);

    await interaction.showModal(modal);
  }

  if (interaction.isModalSubmit()) {
    await interaction.reply({
      content: "Your submission was received successfully!",
    });

    const textInput = interaction.fields.getTextInputValue("textInput");

    const players = parsePlayersText(textInput);

    if (!players.length) {
      console.log("No players found");
      return;
    }

    players.forEach((player) => {
      if (!player) return;

      const statement = db.prepare(
        "INSERT OR IGNORE INTO aliases (alias, fabid, eosid) VALUES (?, ?, ?)"
      );
      statement.run(player.alias, player.fabid, player.eosid);
    });

    console.log(textInput);
  }
};

export { command, interaction, name };
