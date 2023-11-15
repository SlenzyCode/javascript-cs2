const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const gamedig = require("gamedig");
const config = require("../config.json");

module.exports = {
    name: "sunucu-bilgi",
    description: "Sunucu bilgilerini gösterir.",
    type: 1,
    options: [],

    run: async (client, interaction) => {
        const sunucuBilgi = await gamedig.query({
            type: "csgo",
            host: `${config.cs2.sunucuIP}`,
            port: 27015,
        });

        const { name, map, players, maxplayers } = sunucuBilgi;
        const embed = new EmbedBuilder()
            .setColor("Green")
            .setTitle("Sunucu Bilgi CS2")
            .setDescription(`Cs2 bilgileri aşağıda verilmiştir.`)
            .addFields([
                {
                    name: "Sunucu İsmi:",
                    value: `${name}`
                },
                {
                    name: "Sunucu Haritası:",
                    value: `${map}`
                },
                {
                    name: "Oyuncu Sayısı:",
                    value: `${players.length}/${maxplayers}`
                }
            ])
        interaction.reply({
            embeds: [embed]
        });
    },
};
