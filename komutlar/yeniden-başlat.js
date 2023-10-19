const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { botid, ownerid, onay, red} = require('../ayarlar.json')

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('yeniden-başlat')
    .setDescription('Bot sahibi özel komutu.')
    .setDMPermission(false),
              
    async execute(client, interaction) {   
      
      const YetkiYok = new EmbedBuilder()
      .setDescription(`${red} Bu komutu kullanabilmek için **Bot sahibi** olmalısın.`)
      .setColor('Red')
      .setTitle("Hata")
        
    if(interaction.user.id !== ownerid){
    return interaction.reply({embeds: [YetkiYok]});
}
    
      const Başlatıldı = new EmbedBuilder()
         .setDescription(`${onay} **Bot yeniden başlatılıyor.**`)
         .setColor('Green')
         .setTitle('Başarılı')
         
      interaction.reply({embeds: [Başlatıldı]})
        
      setTimeout(() => {
      console.log(`Bot Yeniden Başlatılıyor`);
      process.exit(0);
      }, 2000) 
     
   }
}