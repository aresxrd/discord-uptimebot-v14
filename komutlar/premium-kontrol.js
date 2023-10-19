const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js')
const ms = require('ms')
const { botid, ownerid, onay, red} = require('../ayarlar.json')
const moment = require('moment')
require('moment-duration-format')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('premium-kontrol')
    .setDescription('Premium üyeliğinizin olup, olmadığı hakkında bilgi verir.')
    .setDMPermission(false),
              
    async execute(client, interaction) {   
      let log = client.channels.cache.find(x => x.name == "premium-log")
     
      const PremiumÜye = db.fetch(`PremiumÜye_${interaction.user.id}`)
      
      if(PremiumÜye) {
        if(db.fetch(`Premium_${interaction.user.id}`)) {
          
      const PremiumAktif = new EmbedBuilder()
         .setColor("Green")
         .setDescription(`${onay} **Premium üyeliğiniz bulunmaktadır. Premiumun bitişine kalan zaman:** ${moment.duration(db.fetch(`Premium_${interaction.user.id}`).Bitiş - Date.now()).format('w [hafta] d [gün] h [saat] m [dakika] s [saniye]')}`)
        
      interaction.reply({embeds: [PremiumAktif]}) 
      
      } else {
        
        const PremiumVar = new EmbedBuilder()
         .setColor("Green")
         .setDescription(`${onay} **Premium üyeliğiniz bulunmaktadır. Premiumun bitişine kalan zaman:** Süresiz`)
        
        interaction.reply({embeds: [PremiumVar]})
        
      }
      } else {
      
       const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
        .setURL(`https://discord.gg/RRpECRSaaP`)
        .setLabel("Destek sunucusu")
        .setStyle("Link"))
      
      const PremiumDeaktif = new EmbedBuilder()
         .setColor("Red")
         .setDescription(`${red} **Premium üyeliğiniz bulunmamaktadır, Premium üyelik almak için destek sunucusuna gelebilirsiniz.**`)
        
      interaction.reply({embeds: [PremiumDeaktif], components: [Destek]}) 
      
        }
    }
}