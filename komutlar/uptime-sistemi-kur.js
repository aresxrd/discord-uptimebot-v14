const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const db = require("croxydb")
const { botid, ownerid, onay, red} = require('../ayarlar.json')

module.exports = {
    slash: true, 
    yetki: 'Administrator',
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('uptime-sistemi-kur')
    .setDescription('Uptime sistemini sunucunuzda ayarlar.')
    .setDMPermission(false)
    .addChannelOption(option =>
        option
            .setName('kanal')
            .setDescription('Uptime sisteminin kurulacağı kanalı belirtin.')
            .setRequired(true)),
  
    async execute(client, interaction) {   
        
      const kanal = interaction.options.getChannel('kanal');
      const Sistem = db.fetch(`UptimeSistemi_${interaction.guild.id}`)
      
      if(!Sistem) {
          
        const SistemAçıldı = new EmbedBuilder()
             .setColor("Green")
             .setDescription(`${onay} Uptime kanalı başarıyla <#${kanal.id}> olarak ayarlandı.`)
        interaction.reply({embeds: [SistemAçıldı]})
        
        const SistemMesajı = new EmbedBuilder()
             .setColor("Blue")
             .setImage("https://media.discordapp.net/attachments/1163190176726659092/1164340637697581056/standard_3.gif")
             .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL()}) 
             .setDescription(`# Star Uptime
             <:stardev_link2:1164366935044137060> | Link Eklemek İçin **Uptime Butonuna Basınız**
             <:stardev_cop:1164343281287708792> | Linkinizi Silmek İçin **Delete Butonuna Basınız**
             <:stardev_earth:1164343290590675035> | Linklerinizi Görmek İçin **List Butonuna Basınız**
             <:stardev_github:1164343889902178324> | Github Hesabımız için **Github Butonuna Basınız**`)
     
        const Butonlar = new ActionRowBuilder() 
           .addComponents(new Discord.ButtonBuilder()
           .setEmoji("<:stardev_link:1164353637552766987>")
           .setLabel("Uptime")
           .setStyle(ButtonStyle.Secondary)
           .setCustomId("eklebuton"),
          new Discord.ButtonBuilder()
           .setEmoji("<:stardev_cop:1164343281287708792>")
           .setLabel("Delete")
           .setStyle(ButtonStyle.Secondary)
           .setCustomId("silbuton"),
           new Discord.ButtonBuilder()
           .setEmoji("<:stardev_earth:1164343290590675035>")
           .setLabel("List")
           .setStyle(ButtonStyle.Secondary)
           .setCustomId("listebuton"),
           new Discord.ButtonBuilder()  
        .setEmoji("<:stardev_github:1164343889902178324>")
       .setURL(`https://github.com/aresxrd`)
        .setLabel(`Github`)
        .setStyle("Link"))
        
        client.channels.cache.get(kanal.id).send({embeds: [SistemMesajı], components: [Butonlar]})
        
        db.set(`UptimeSistemi_${interaction.guild.id}`, kanal.id)
          
        } else {
           
        const SistemAçık = new EmbedBuilder()
         .setColor("Red")
         .setDescription(`<:No:1122993152064765973> Uptime sistemi zaten kurulu. Sıfırlamak için **/uptime-sistemi-sıfırla**`)
      
        interaction.reply({embeds: [SistemAçık]})
        
         
     }
   }
}