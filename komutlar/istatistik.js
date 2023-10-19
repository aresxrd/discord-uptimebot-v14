const Discord = require('discord.js')//Developed by aresxrd
const db = require('croxydb')//Developed by aresxrd
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js')//Developed by aresxrd
const { botid, ownerid } = require("../ayarlar.json")//Developed by aresxrd
const osutils = require('os-utils') //Developed by aresxrd
//Developed by aresxrd
module.exports = {//Developed by aresxrd
    slash: true,                                
    cooldown: 5,                              
//Developed by aresxrd
    data: new SlashCommandBuilder()         
    .setName('istatistik')
    .setDescription('Bot istatistiklerini gösterir.')
    .setDMPermission(false),
      
    async execute(client, interaction) {   
      
      let a = client.users.cache.get('1143638421257072661').tag
//Developed by aresxrd
   //Developed by aresxrd
      
    //  osutils.cpuUsage(function(v) {
        
      const Linkler = db.fetch(`UptimeLink`) || []
      const Uptime = db.fetch(`UptimeLink_${interaction.user.id}`) || []
      const LinkLimit = db.fetch(`LinkLimit_${interaction.user.id}`) || 0
      let Limit = LinkLimit+3
      
      {
        
      let days = Math.floor(client.uptime / 86400000);
      let hours = Math.floor(client.uptime / 3600000) % 24;
      let minutes = Math.floor(client.uptime / 60000) % 60;
      let seconds = Math.floor(client.uptime / 1000) % 60;
      
       const IstatistikYok = new EmbedBuilder()
      .setImage("https://media.discordapp.net/attachments/1163190176726659092/1164340637697581056/standard_3.gif")
      .setColor("Blue")
      .addFields(      
        {//Developed by aresxrd
          name: "<:stardev_link2:1164366935044137060> | Toplam Projeler",
          value: `**${Linkler.length}**`,
          inline: true
        },//Developed by aresxrd
        {
          name: "<:stardev_book:1164362461181399111> | Senin projelerin",
          value: `**${Uptime.length}\**`,
          inline: true
        })          
      
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
     
     return interaction.reply({embeds: [IstatistikYok]})
       
     }
      // })
    }
}
