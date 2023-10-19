const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { botid, ownerid, onay, red} = require('../ayarlar.json')

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('sil')
    .setDescription('<:No:1122993152064765973> Bu komutu sadece <@1112637700604960880> kullanabilir')
    .setDMPermission(false),
  
    async execute(client, interaction) {   
    }
}