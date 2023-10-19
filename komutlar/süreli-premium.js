const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const ms = require('ms')
const moment = require('moment')
require('moment-duration-format')
const db = require("croxydb")
const { botid, ownerid, onay, red} = require('../ayarlar.json')

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('süreli-premium')
    .setDescription('Bot sahibi özel komutu.')
    .setDMPermission(false)
    .addUserOption(option =>
        option
            .setName('kullanıcı')
            .setDescription('Premium verilecek kullanıcıyı belirtin.')
            .setRequired(true))
    .addStringOption(option =>
        option
            .setName('süre')
            .setDescription('Premium verilecek süreyi belirtin.')
            .setRequired(true)),
  
    async execute(client, interaction) {   
        let log = client.channels.cache.find(x => x.name == "premium-log")
      
      const YetkiYok = new EmbedBuilder()
      .setDescription(`${red} Bu komutu kullanabilmek için **Bot sahibi** olmalısın.`)
      .setColor('Red')
        
    if(interaction.user.id !== ownerid){
    return interaction.reply({embeds: [YetkiYok]});
}
      
      const kullanıcı = interaction.options.getUser('kullanıcı');
      const süre = interaction.options.getString('süre');

      const PremiumÜye = db.fetch(`PremiumÜye_${kullanıcı.id}`);
      
      const PremiumVar = new EmbedBuilder()
         .setColor("Red")
         .setDescription(`${red} ${kullanıcı} **adlı kullanıcının zaten premium üyeliği bulunuyor.**`)
        
      if(!PremiumÜye) {
      
      let PremiumBitiş = Date.now() + ms(süre.replace('Gün', 'Day').replace('Saat', 'Hours').replace('Hafta', 'Week').replace('Ay', 'Month').replace('Yıl', 'Year'))
      db.set(`PremiumÜye_${kullanıcı.id}`, true)
      db.add(`PremiumSayı`, 1)
      db.set(`Premium_${kullanıcı.id}`, {Bitiş: PremiumBitiş, Başlangıç: Date.now()})
        
      const PremiumEklendi = new EmbedBuilder()
         .setColor("Green")
         .setDescription(`${onay} ${kullanıcı} **adlı kullanıcıya premium verildi. Bitiş tarihi:** ${moment(PremiumBitiş).format('DD.MM.YYYY - HH:mm:ss')}`)
        
      interaction.reply({embeds: [PremiumEklendi]})
      
      const PremiumVerildi = new EmbedBuilder()
      .setImage("https://media.discordapp.net/attachments/1163190176726659092/1164340637697581056/standard_3.gif")
      .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL()}) 
      .setColor("Green")
      .setTitle("Bir Kullanıcıya Süreli Premimum Verildi!")
      .addFields({name: `<:stardev_yildiz6:1164343292159336510> **Kullanıcı**`, value: `${kullanıcı}`})
      .addFields({name: `<:stardev_id:1164362045135794186> **Kullanıcı ID**`, value: `**\`${kullanıcı.id}\`**`})
      .addFields({name: `<:stardev_yildiz6:1164343292159336510> **Premiumu Veren Kişi**`, value: `<@${interaction.user.id}>`})
      .addFields({name: `<:stardev_takvim:1164369222240063549> **Bitiş tarihi**`, value: `${moment(PremiumBitiş).format('DD.MM.YYYY - HH:mm:ss')}`})
      
      log.send({embeds: [PremiumVerildi]}) 

      setTimeout(() => {
        
      db.delete(`PremiumÜye_${kullanıcı.id}`)
      db.delete(`Premium_${kullanıcı.id}`)
      db.subtract(`PremiumSayı`, 1)
        
      const PremiumGitti = new EmbedBuilder()
      .setImage("https://media.discordapp.net/attachments/1163190176726659092/1164340637697581056/standard_3.gif")
      .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL()}) 
         .setColor("Red")
         .setTitle("Bir Kullanıcının Premium Süresi Doldu!")
         .addFields({name: `<:stardev_yildiz6:1164343292159336510> **Kullanıcı**`, value: `${kullanıcı}`})
         .addFields({name: `<:stardev_id:1164362045135794186> **Kullanıcı ID**`, value: `**\`${kullanıcı.id}\`**`})
         
         client.channels.cache.find(x => x.name == "premium-log").send({embeds: [PremiumGitti]})

      }, ms(süre.replace('Gün', 'Day').replace('Saat', 'Hours').replace('Hafta', 'Week').replace('Ay', 'Month').replace('Yıl', 'Year')))
       
      } else {
   
      interaction.reply({embeds: [PremiumVar]})
      
        }
    }
}