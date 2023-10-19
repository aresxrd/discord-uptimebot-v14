const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require("croxydb")
const { botid, ownerid, onay, red} = require('../ayarlar.json')
module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('yardım')
    .setDescription('Uptime yardım menüsü.')
    .setDMPermission(false),
  
    async execute(client, interaction) {   
      
      const Duyuru = db.fetch(`Duyurular`)
      if(!Duyuru) {
       
      const Yardım = new EmbedBuilder()
         .setColor("Blurple")
         .setImage("https://media.discordapp.net/attachments/1163190176726659092/1164340637697581056/standard_3.gif")
         .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL()}) 
         .setTitle("Star Uptime • Yardım menüsü")
         .setDescription(`
</yardım:0> Yardım menüsünü gösterir.

</istatistik:0> Bot istatistiklerini gösterir.

</ping:0> Botun ping değerlerini gösterir.

</link-say:0> Sistemdeki link sayılarını gösterir.

</link-ekle:0> Sisteme link eklersiniz.

</link-sil:0> Sistemden link silersiniz.

</link-liste:0> Sistemdeki linklerinizi listeler.

</premium-kontrol:0> Premium üyeliğinizin olup, olmadığını gösterir.

</davet:0> Bot linklerini gösterir.

</uptime-sistemi-kur:0> Sunucuya özel butonlu uptime sistemini kurarsınız.

</uptime-sistemi-sıfırla:0> Sunucudaki uptime sistemini sıfırlar.


`)
 .setFooter(`Developed by aresxrd`) 
    .setTimestamp()
      interaction.reply({embeds: [Yardım]})
        
      } else {
       
        const duyurular = db.fetch(`Duyurular`).map(y => ` \`${y}\``).join("\n")
        
        const Yardım = new EmbedBuilder()
         .setColor("Blurple")
         .setImage("https://media.discordapp.net/attachments/1163190176726659092/1164340637697581056/standard_3.gif")
         .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL()}) 
         .setTitle("Star Uptime • Yardım menüsü")
         .setDescription(`<:pin:1113173619787452507> **Bot duyuruları**
        > <:sag:1113173952664174696> ${duyurular || "Aktif bir duyuru bulunmuyor."}
      
    <:pin:1113188744586084474> **Bot komutları**
</yardım:0> Star Uptime yardım menüsünü gösterir.

</istatistik:0> Botun istatistiklerini gösterir.

</ping:0> Botun gecikme sürelerini gösterir.

</link-say:0> Sistemdeki linklerin sayısını gösterir.

</link-ekle:0> Sisteme link eklersiniz.

</link-sil:0> Sistemdeki linkinizi silersiniz.

</link-liste:0> Sisteme eklemiş olduğunuz linkleri gösterir.

</premium-kontrol:0> Premium üyeliğinizi kontrol edersiniz.

</davet:0> Botun bağlantılarını gösterir.

</uptime-sistemi-kur:0> Sunucuya özel butonlu uptime sistemini kurarsınız.

</uptime-sistemi-sıfırla:0> Sunucudaki uptime sistemini sıfırlar.

`)
.setFooter(`Developed by aresxrd`) 
    .setTimestamp()
        interaction.reply({embeds: [Yardım]})
    }   
  }
}