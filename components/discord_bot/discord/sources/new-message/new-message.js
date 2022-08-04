const discord = require("../../discord-v2.app.js");

module.exports = {
  type: "source",
  key: "discord_bot-new-message",
  name: "New Message",
  description: "Emit new event for each message posted to one or more channels in a Discord server",
  version: "0.0.3",
  dedupe: "unique",
  props: {
    discord,
    channels: {
      type: "$.discord.channel[]",
      appProp: "discord",
      label: "Channels",
      description: "Select the channel(s) you'd like to be notified for",
    },
    // eslint-disable-next-line pipedream/props-label,pipedream/props-description
    discordApphook: {
      type: "$.interface.apphook",
      appProp: "discord",
      async eventNames() {
        return this.channels || [];
      },
    },
  },
  async run(event) {
    if (event.guildID != this.discord.$auth.guild_id) {
      return;
    }
    this.$emit(event, {
      id: event.id,
    });
  },
};
