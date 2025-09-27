import {
  ActionRowBuilder,
  ModalBuilder,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
  type CacheType,
  type Interaction,
} from "discord.js";

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
    console.log(textInput);
  }
};

export { name, command, interaction };
