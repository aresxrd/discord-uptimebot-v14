const Discord = require('discord.js')
const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, InteractionType, EmbedBuilder } = require('discord.js')
const db = require("croxydb")
const { botid, ownerid, onay, red} = require('../ayarlar.json')

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('link-sil')
    .setDescription('Sistemden link silersiniz.')
    .setDMPermission(false),
  
    async execute(client, interaction) { 
        let log = client.channels.cache.find(x => x.name == "uptime-log")
      
const ProjeYok = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`${red} **Sistemde böyle bir proje bulunmuyor.**`)
    
const LinkSilindi = new EmbedBuilder()
    .setColor("Green")
    .setDescription(`${onay} **Projen başarıyla sistemden silindi.**`)
    
const LinkSilmeFormu = new ModalBuilder()
    .setCustomId('linksilmeform')
const LinkSilFormu = new TextInputBuilder()
    .setCustomId('linksil')
    .setLabel('Proje adresinizi giriniz.')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(20)
    .setMaxLength(100)
    .setPlaceholder('https://star-development.glitch.me')
    .setRequired(true)
const LinkSilmeSistemi = new ActionRowBuilder().addComponents(LinkSilFormu);
LinkSilmeFormu.addComponents(LinkSilmeSistemi);
      
      const PremiumÜye = db.fetch(`PremiumÜye_${interaction.guild.id}`)
      
      await interaction.showModal(LinkSilmeFormu);
  
      await interaction.awaitModalSubmit({ filter: (interaction) => interaction.customId === `linksilmeform`, time: 60 * 60 * 1000 }).then(async (interaction) => {
 
      const links = db.get(`UptimeLink_${interaction.user.id}`)
      let linkInput = interaction.fields.getTextInputValue("linksil")

      if (!links.includes(linkInput)) return interaction.reply({embeds: [ProjeYok]}).catch(e => { })
      
     // if(!PremiumÜye) {
        
        db.unpush(`UptimeLink_${interaction.user.id}`, linkInput)
        db.unpush(`UptimeLink`, linkInput)
     
     /* } else {
        
        db.unpush(`UptimeLink_${interaction.user.id}`, linkInput)
        db.unpush(`PremiumUptimeLink`, linkInput)
        
      }*/
        interaction.reply({embeds: [LinkSilindi]}).catch(e => { })
      
        let PremiumVarmı = db.fetch(`PremiumÜye_${interaction.user.id}`)
        
        let PreVarmı;
        if(!PremiumVarmı) {
        PreVarmı = `${onay}`
        } else {
        PreVarmı = `${red}`
        }
  
        const ProjeSilindi = new EmbedBuilder()
        .setImage("https://media.discordapp.net/attachments/1163190176726659092/1164340637697581056/standard_3.gif")
        .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL()}) 
         .setColor("Red")
         .setTitle("Sistemden Bir Link Silindi")
         .addFields({name: `<:stardev_yildiz6:1164343292159336510> **Kullanıcı**`, value: `<@${interaction.user.id}>`})
         .addFields({name: `<:stardev_id:1164362045135794186> **Kullanıcı ID**`, value: `**\`${interaction.user.id}\`**`})
         .addFields({name: `<:stardev_book:1164362461181399111>**Sistemdeki Link Sayısı**`, value: `**\`${db.fetch(`UptimeLink`).length}\`**`})
         .addFields({name: `<:stardev_link:1164353637552766987> **Kullanıcının Link Sayısı**`, value: `**\`${db.fetch(`UptimeLink_${interaction.user.id}`).length}\`**`})
         .addFields({name: `<:stardev_link2:1164366935044137060> **Kullanıcının Sildiği Link**`, value: `**${linkInput}**`})
         client.channels.cache.find(x => x.name == "uptime-log").send({embeds: [ProjeSilindi]})
        
      })  
   }
}