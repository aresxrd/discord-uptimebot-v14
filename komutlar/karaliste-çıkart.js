const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require("croxydb")
const { botid, ownerid, onay, red} = require('../ayarlar.json')

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('karaliste-çıkart')
    .setDescription('Bot sahibi özel komutu.')
    .setDMPermission(false)
    .addUserOption(option =>
        option
            .setName('kullanıcı')
            .setDescription('Karalisteden çıkartılacak kullanıcıyı belirtin.')
            .setRequired(true)),
              
    async execute(client, interaction) {  
      let log = client.channels.cache.find(x => x.name == "karaliste-log")
      
      const YetkiYok = new EmbedBuilder()
         .setDescription(`${red} Bu komutu kullanabilmek için **Bot sahibi** olmalısın.`)
         .setColor('Red')
        
    if(interaction.user.id !== ownerid){
    return interaction.reply({embeds: [YetkiYok]});
}
      const kullanıcı = interaction.options.getUser('kullanıcı');
      const Karaliste = db.fetch(`Karaliste_${kullanıcı.id}`)
      
      const KaralisteÇıkartılmaz = new EmbedBuilder()
        .setDescription(`${red} **Bot sahipleri bu komutdan etkilenmez.**`)
        .setColor('Red')
      
      const KaralisteGitti = new EmbedBuilder()
      .setDescription(`${onay} ${kullanıcı} **adlı kullanıcı karalisteden çıkartıldı, artık botu kullanabilir.**`)
      .setColor('Green')
      
         const KaralistedenÇıkartıldı = new EmbedBuilder()
         .setImage("https://media.discordapp.net/attachments/1163190176726659092/1164340637697581056/standard_3.gif")
         .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL()}) 
         .setColor("Green")
         .setTitle("Bir Kullanıcı Karalisteden Çıkarıldı!")
         .addFields({name: `<:stardev_yildiz6:1164343292159336510> **Kullanıcı**`, value: `${kullanıcı}`})
         .addFields({name: `<:stardev_id:1164362045135794186> **Kullanıcı ID**`, value: `**\`${kullanıcı.id}\`**`})
         .addFields({name: `<:stardev_yildiz6:1164343292159336510> **Yetkili**`, value: `${interaction.user}`})
         .addFields({name: `<:stardev_id:1164362045135794186> **Yetkili ID**`, value: `**\`${interaction.user.id}\`**`})
       
    //  if(interaction.member.roles.cache.has === "1064963065726111754") return interaction.reply({embeds: [KaralisteÇıkartılmaz]})
     
      if(!Karaliste) {
        
        const KaralistedeYok = new EmbedBuilder()
           .setDescription(`:x: ${kullanıcı} **adlı kullanıcı zaten karalistede bulunmuyor.**`)
           .setColor('Red')
        
        interaction.reply({embeds: [KaralistedeYok]})
      
      } else {
       
        db.delete(`Karaliste_${kullanıcı.id}`)
        db.delete(`KaralisteSebep_${kullanıcı.id}`)
        interaction.reply({embeds: [KaralisteGitti]})
        client.channels.cache.find(x => x.name == "karaliste-log").send({embeds: [KaralistedenÇıkartıldı]})
        
        }
    }
}