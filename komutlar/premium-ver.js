const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require("croxydb")
const { botid, ownerid, onay, red} = require('../ayarlar.json')

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('premium-ver')
    .setDescription('Bot sahibi özel komutu.')
    .setDMPermission(false)
    .addUserOption(option =>
        option
            .setName('kullanıcı')
            .setDescription('Premium verilecek kullanıcıyı belirtin.')
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
      const PremiumÜye = db.fetch(`PremiumÜye_${kullanıcı.id}`);
      
      const PremiumEklendi = new EmbedBuilder()
         .setColor("Green")
         .setDescription(`${onay} ${kullanıcı} **adlı kullanıcıya premium verildi.**`)
        
      const PremiumVar = new EmbedBuilder()
         .setColor("Red")
         .setDescription(`${red} ${kullanıcı} **adlı kullanıcının zaten premium üyeliği bulunuyor.**`)
        
         const PremiumVerildi = new EmbedBuilder()
         .setImage("https://media.discordapp.net/attachments/1163190176726659092/1164340637697581056/standard_3.gif")
         .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL()}) 
         .setColor("Green")
         .setTitle("Bir Kullanıcıya Premimum Verildi!")
         .addFields({name: `<:stardev_yildiz6:1164343292159336510> **Kullanıcı**`, value: `${kullanıcı}`})
         .addFields({name: `<:stardev_id:1164362045135794186> **Kullanıcı ID**`, value: `**\`${kullanıcı.id}\`**`})
         .addFields({name: `<:stardev_yildiz6:1164343292159336510> **Premiumu Veren Kişi**`, value: `<@${interaction.user.id}>`})
      
      if(!PremiumÜye) {
      
      db.set(`PremiumÜye_${kullanıcı.id}`, true)
      interaction.reply({embeds: [PremiumEklendi]})
      client.channels.cache.find(x => x.name == "premium-log").send({embeds: [PremiumVerildi]})
      db.add(`PremiumSayı`, 1)
      
      } else {
   
      interaction.reply({embeds: [PremiumVar]})
      
        }
    }
}