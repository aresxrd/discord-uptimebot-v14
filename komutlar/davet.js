const Discord = require('discord.js')
const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require('discord.js')//Developed by aresxrd  
const { botid, ownerid, onay, red} = require('../ayarlar.json')

module.exports = {//Developed by aresxrd  
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('davet')//Developed by aresxrd  
    .setDescription('Botun linklerini gösterir.')
    .setDMPermission(false),//Developed by aresxrd  
  
    async execute(client, interaction) {
      
      const Destek = new ActionRowBuilder().addComponents(new ButtonBuilder()        
        .setURL(`https://discord.gg/RRpECRSaaP`)//Developed by aresxrd  
        .setLabel(`Destek sunucusu`)
        .setStyle("Link"))
      
      

      //Developed by aresxrd  
      const DavetEmbed = new EmbedBuilder()
        .setColor("Blue")
        .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL()}) 
        .setDescription(`<:stardev_developer:1163655144156704808> Developed by aresxrd`)
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) //Developed by aresxrd  
    .setTimestamp()//Developed by aresxrd  
      
     return interaction.reply({embeds: [DavetEmbed], components: [Destek]})//Developed by aresxrd  

    }
}