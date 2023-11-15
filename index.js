const { Client, GatewayIntentBits, InteractionType, IntentsBitField, Partials, PermissionsBitField, EmbedBuilder, ButtonBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, AuditLogEvent, ActionRowBuilder, messageLink, ChannelType, ButtonComponent, ButtonStyle } = require("discord.js");
const fs = require("fs");

    const client = new Client({
        intents: Object.values(IntentsBitField.Flags),
        partials: Object.values(Partials)
    });

const db = require("croxydb");
const config = require("./config.json");
const chalk = require("chalk");

global.client = client;
client.commands = (global.commands = []);

fs.readdirSync("./commands").forEach(file => {
    if (!file.endsWith(".js")) return;

    const commands = require(`./commands/${file}`);

    client.commands.push({
        name: commands.name.toLowerCase(),
        description: commands.description,
        options: commands.options,
        dm_permission: false,
        type: 1
    });
    console.log(chalk.red("[KOMUTLAR]", chalk.white(`${commands.name} komutunu yükledim.`)))
});

fs.readdirSync("./events").forEach(event => {

    const eve = require(`./events/${event}`);
    const name = event.split(".")[0];

    client.on(name, (...args) => {
        eve(client, ...args)
    });
    console.log(chalk.blue("[EVENTLER]", chalk.white(`${name} eventini yükledim.`)))
});

process.on("unhandledRejection", async (error) => {
    return console.log(chalk.red("[HATA]"), chalk.white(`Bir hata ile karşılaştım!\n\n${error}`))
});

client.login(config.bot.token);