const Discord = require('discord.js')//Developed by aresxrd
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')//Developed by aresxrd
const db = require("croxydb")
const { botid, ownerid, onay, red} = require('../ayarlar.json')

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('karaliste-ekle')
    .setDescription('Bot sahibi özel komutu.')
    .setDMPermission(false)
    .addUserOption(option =>
        option
            .setName('kullanıcı')
            .setDescription('Karalisteye eklenecek kullanıcıyı belirtin.')
            .setRequired(true))
    .addStringOption(option =>
        option
            .setName('sebep')
            .setDescription('Karalisteye ekleme sebebini belirtin.')
            .setRequired(true)),
  
    async execute(client, interaction) {   
      let log = client.channels.cache.find(x => x.name == "karaliste-log")
     
      const YetkiYok = new EmbedBuilder()
      .setDescription(`${red} Bu komutu kullanabilmek için **Bot sahibi** olmalısın.`)
      .setColor('Red')
        
      const KaralisteAlınamaz = new EmbedBuilder()
        .setDescription(`${red} **Bot sahipleri bu komutdan etkilenmez.**`)
        .setColor('Red')
      
    if(interaction.user.id !== ownerid){
    return interaction.reply({embeds: [YetkiYok]});
}
      const kullanıcı = interaction.options.getUser('kullanıcı');
      const sebep = interaction.options.getString('sebep');
      const Karaliste = db.fetch(`Karaliste_${kullanıcı.id}`)
      
      const KaralisteEklendi = new EmbedBuilder()
      .setDescription(`${onay} ${kullanıcı} **adlı kullanıcı karalisteye eklendi, artık botu kullanamayacak.**`)
      .setColor('Green')
      
      const KaralisteyeAlındı = new EmbedBuilder()
         .setImage("https://media.discordapp.net/attachments/1163190176726659092/1164340637697581056/standard_3.gif")
         .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL()}) 
         .setColor("Red")
         .setTitle("Bir Kullanıcı Karalisteye Eklendi!")
         .addFields({name: `<:stardev_yildiz6:1164343292159336510> **Kullanıcı**`, value: `${kullanıcı}`})
         .addFields({name: `<:stardev_id:1164362045135794186> **Kullanıcı ID**`, value: `**\`${kullanıcı.id}\`**`})
         .addFields({name: `<:stardev_yildiz6:1164343292159336510> **Yetkili**`, value: `${interaction.user}`})
         .addFields({name: `<:stardev_id:1164362045135794186> **Yetkili ID**`, value: `**\`${interaction.user.id}\`**}`})
         .addFields({name: ` **Karaliste Eklenme Sebebi**`, value: `**\`${sebep}\`**`})
      
    //  if(interaction.member.roles.cache.has === "1064963065726111754") return interaction.reply({embeds: [KaralisteAlınamaz]})
     
      if(!Karaliste) {
        
      db.set(`Karaliste_${kullanıcı.id}`, true)
      db.set(`KaralisteSebep_${kullanıcı.id}`, sebep)
    //  db.delete(`UptimeLink_${kullanıcı.id}`)
      interaction.reply({embeds: [KaralisteEklendi]})
      client.channels.cache.find(x => x.name == "karaliste-log").send({embeds: [KaralisteyeAlındı]})
     
      } else {
  
      const KaralistedeVar = new EmbedBuilder()
      .setDescription(`${red} ${kullanıcı} **adlı kullanıcı zaten karalistede bulunuyor.**`)
      .setColor('Red')
      
      interaction.reply({embeds: [KaralistedeVar]})
  
       }
    }
}


