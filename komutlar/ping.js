const { Discord, EmbedBuilder, SlashCommandBuilder } = require('discord.js')
const { botid, ownerid, onay, red} = require('../ayarlar.json')

module.exports = {
    slash: true,                               
    cooldown: 5, 
  
    data: new SlashCommandBuilder()       
    .setName('ping')
    .setDescription('Botun gecikme sürelerini gösterir.'),
 
    async execute(client, interaction) {
      
     let pinge = ''
     let bote = ''
     let mesajgecikme = new Date().getTime() - interaction.createdTimestamp
     let ping = client.ws.ping
 
     if(ping < 50) {
     const embed = new EmbedBuilder()
        .addFields({
        name:`${bote} ${red} **Bot gecikmesi:**`,
        value: `\`${ping}ms\``
        },
        {
        name: `${pinge} ${red} **Mesaj gecikmesi:**`,
        value: `\`${mesajgecikme}ms\``})
       .setColor(`Green`) 
     interaction.reply({embeds: [embed]})
     }
      
     if(ping >= 50 && ping < 100) {
      const embed2 = new EmbedBuilder()
         .addFields({
        name:`${bote} ${red} **Bot gecikmesi:**`,
        value: `\`${ping}ms\``
        },
        {
        name: `${pinge} ${red} **Mesaj gecikmesi:**`,
        value: `\`${mesajgecikme}ms\``})
        .setColor(`Yellow`) 
     interaction.reply({embeds: [embed2]})
     }
      
     if(ping >= 100 && ping < 500) {
       const embed3 = new EmbedBuilder()
        .addFields({
        name:`${bote} ${red} **Bot gecikmesi:**`,
        value: `\`${ping}ms\``
        },
        {
        name: `${pinge} ${red} **Mesaj gecikmesi:**`,
        value: `\`${mesajgecikme}ms\``})
       .setColor(`Red`) 
     interaction.reply({embeds: [embed3]})
     }
     
     if(ping >= 500) {
       const embed4 = new EmbedBuilder()
        .addFields({
        name:`${bote} ${red} **Bot gecikmesi:**`,
        value: `\`${ping}ms\``
        },
        {
        name: `${pinge} ${red} **Mesaj gecikmesi:**`,
        value: `\`${mesajgecikme}ms\``})
        .setColor(`Black`) 
     interaction.reply({embeds: [embed4]})
     }
      
  }
}
