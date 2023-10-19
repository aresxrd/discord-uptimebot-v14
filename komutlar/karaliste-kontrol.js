const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js')
const db = require("croxydb")
const { botid, ownerid, red, onay} = require('../ayarlar.json')

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('karaliste-kontrol')
    .setDescription('Bot sahibi özel komutu.')
    .setDMPermission(false)
    .addUserOption(option =>
        option
            .setName('kullanıcı')
            .setDescription('Karaliste bilgisine bakılacak kullanıcıyı belirtin.')
            .setRequired(true)),
              
    async execute(client, interaction) {   
     
       const YetkiYok = new EmbedBuilder()
          .setDescription(`${red} Bu komutu kullanabilmek için **Bot sahibi** olmalısın.`)
          .setColor('Red')
        
    if(interaction.user.id !== ownerid){
    return interaction.reply({embeds: [YetkiYok]});
}
      
       const kullanıcı = interaction.options.getUser('kullanıcı');

       const Karaliste = db.fetch(`Karaliste_${kullanıcı.id}`)
      
       const KaralistedeVar = new EmbedBuilder()
         .setColor("Red")
         .setDescription(`${red} ${kullanıcı} **adlı kullanıcı karalistede bulunuyor, komutları kullanamaz.**`)
      
      const KaralistedeYok = new EmbedBuilder()
         .setColor("Green")
         .setDescription(`${onay} ${kullanıcı} **adlı kullanıcı karalistede bulunmuyor, komutları kullanabilir.**`)
        
      if(!Karaliste) {
      
      interaction.reply({embeds: [KaralistedeYok]}) 
      
      } else {
      
      interaction.reply({embeds: [KaralistedeVar]}) 
        
        }
    }
}