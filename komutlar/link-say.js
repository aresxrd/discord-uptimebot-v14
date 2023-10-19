const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require("croxydb")
const { botid, ownerid, onay, red} = require('../ayarlar.json')

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('link-say')
    .setDescription('Sistemdeki linklerin sayısını gösterir.')
    .setDMPermission(false),
  
    async execute(client, interaction) {  
      
      const Uptime = db.fetch(`UptimeLink_${interaction.user.id}`) || []
      const LinkLimit = db.fetch(`LinkLimit_${interaction.user.id}`) || 0
      let Limit = LinkLimit+3
      const Linkler = db.fetch(`UptimeLink`) || []
      const KişiLinkleri = db.fetch(`UptimeLink_${interaction.user.id}`) || []

      if(!Uptime.length <= 0) {
        
      const SayYok = new EmbedBuilder()
         .setColor("Blurple")
         .setTitle("Star Uptime • Proje Sayıları")
         .addFields({name: `<:Belge:1046825193131225169> **Sistemdeki Toplam Projeler**`, value: `**\`${Linkler.length}\`**`})
         .addFields({name: `<:Link:1046776084965900308> **Senin Toplam Projelerin**`, value: `**\`Hiç link eklememişsin.\`**`})
         .addFields({name: `<:Premium:1047169286659129487> **Toplam Premium Üyeler**`, value: `**\`${db.fetch(`PremiumSayı`) || 0}\`**`})
         .addFields({name: `<:stardev_unlem2:1164372473006006345> **Link Ekleme Hakkın**`, value: `**\`${Limit}\`**`})
        
      interaction.reply({embeds: [SayYok]})
      
      } else {
      
      const Say = new EmbedBuilder()
      .setColor("Blurple")
      .setTitle("Star Uptime • Proje Sayıları")
      .addFields({name: `<:Belge:1046825193131225169> **Sistemdeki Toplam Projeler**`, value: `**\`${Linkler.length}\`**`})
      .addFields({name: `<:Link:1046776084965900308> **Senin Toplam Projelerin**`, value: `**\`${KişiLinkleri.length}\`**`})
      .addFields({name: `<:Premium:1047169286659129487> **Toplam Premium Üyeler**`, value: `**\`${db.fetch(`PremiumSayı`) || 0}\`**`})
      .addFields({name: `<:stardev_unlem2:1164372473006006345> **Link Ekleme Hakkın**`, value: `**\`${Limit}\`**`})
        
      interaction.reply({embeds: [Say]})
        
        }
    }
}
