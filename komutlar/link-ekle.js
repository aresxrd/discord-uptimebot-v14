const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, InteractionType, EmbedBuilder } = require('discord.js')
const db = require("croxydb")
const { botid, ownerid, onay, red} = require('../ayarlar.json')

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('link-ekle')
    .setDescription('Sisteme link eklersiniz.')
    .setDMPermission(false),
  
    async execute(client, interaction) {   
    
  
const LinkEklemeFormu = new ModalBuilder()
    .setCustomId('linkeklemeform')
    .setTitle('Link ekle')
const LinkEkleFormu = new TextInputBuilder()
    .setCustomId('linkekle')
    .setLabel('Proje adresinizi giriniz.')
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(20)
    .setMaxLength(100)
    .setPlaceholder('https://star-development.glitch.me')
    .setRequired(true)
const LinkEklemeSistemi = new ActionRowBuilder().addComponents(LinkEkleFormu);
LinkEklemeFormu.addComponents(LinkEklemeSistemi);
      
const PreYok = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`${red} **Normal bir kullanıcı en fazla 3 proje ekleyebilir, Destek sunucusuna gelerek link limitinizi arttırabilir veya premium alarak sınırsız link ekleme hakkı kazanabilirsiniz.**`)
    
const FazlaLink = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`${red} **Bir kullanıcı tarafından en fazla 999 link eklenebilir.**`)
   
const LinkVar = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`${red} **Belirtilen proje sistemde bulunuyor.**`)
    
const BaşıHatalı = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`${red} **Proje linkin hatalı, linkin başında \`https://\` olduğundan emin ol.**`)
    
const SonuHatalı = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`${red} **Yalnızca glitch projeleri aktif tutulmaktdır, linkin sonunda \`.glitch.me\` olduğundan emin ol.**`)
    
const LinkEklendi = new EmbedBuilder()
    .setColor("Green")
    .setDescription(`<:Yes:1122994864049619127> **Projen başarıyla sisteme eklendi, linkiniz 2-5 dk içerisinde aktif olacaktır.**`)
        
const ProjeYok = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`${red} **Sistemde böyle bir proje bulunmuyor.**`)
    
const LinkSilindi = new EmbedBuilder()
    .setColor("Green")
    .setDescription(`${onay} **Projen başarıyla sistemden silindi.**`)
    
const Silindi = new EmbedBuilder()
    .setColor("Green")
    .setDescription(`${onay} **Proje başarıyla sistemden silindi.**`)
    
const ProjeEklenmemiş = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`${red}  **Sisteme hiç proje eklememişsin.**`)
      await interaction.showModal(LinkEklemeFormu);
  
      await interaction.awaitModalSubmit({ filter: (interaction) => interaction.customId === `linkeklemeform`, time: 60 * 60 * 1000 }).then(async (interaction) => {
 
      const LinkLimit = db.fetch(`LinkLimit_${interaction.user.id}`) || 0
      let Limit = LinkLimit+3
      
      if (!db.fetch(`UptimeLink_${interaction.user.id}`)) {
           db.set(`UptimeLink_${interaction.user.id}`, [])
        }
        const link = interaction.fields.getTextInputValue("linkekle")
        let link2 = db.fetch(`UptimeLink_${interaction.user.id}`, [])

        const PremiumÜye = db.fetch(`PremiumÜye_${interaction.user.id}`)

        if(!link) return

        if(PremiumÜye) {
            if (db.fetch(`UptimeLink_${interaction.user.id}`).length >= 999) {
                return interaction.reply({embeds: [FazlaLink]}).catch(e => { })
            }

        } else {
            if (db.fetch(`UptimeLink_${interaction.user.id}`).length >= Limit) {
                return interaction.reply({embeds: [PreYok]}).catch(e => { })}
          }

        if (link2.includes(link)) {
            return interaction.reply({embeds: [LinkVar]}).catch(e => { })
        }

        if (!link.startsWith("https://")) {
            return interaction.reply({embeds: [BaşıHatalı]}).catch(e => { })
        }

        if (!link.endsWith(".glitch.me")) {
            return interaction.reply({embeds: [SonuHatalı]}).catch(e => { })
        }
      //if(!PremiumÜye) {
        
        db.push(`UptimeLink_${interaction.user.id}`, link)
        db.push(`UptimeLink`, link)
      
     /* } else {
        
        db.push(`UptimeLink_${interaction.user.id}`, link)
        db.push(`PremiumUptimeLink`, link)
        
      }*/
        interaction.reply({embeds: [LinkEklendi]}).catch(e => { })
      
        let PremiumVarmı = db.fetch(`PremiumÜye_${interaction.user.id}`)
        
        let PreVarmı;
        if(!PremiumVarmı) {
        PreVarmı = `${red}`
        } else {
        PreVarmı = `${onay}`
        }
      
     
        const ProjeEklendi = new EmbedBuilder()
        .setImage("https://media.discordapp.net/attachments/1163190176726659092/1164340637697581056/standard_3.gif")
        .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL()}) 
         .setColor("Green")
         .setTitle("Sisteme Bir Link Eklendi")
         .addFields({name: `<:stardev_yildiz6:1164343292159336510> **Kullanıcı**`, value: `<@${interaction.user.id}>`})
         .addFields({name: `<:stardev_id:1164362045135794186> **Kullanıcı ID**`, value: `**\`${interaction.user.id}\`**`})
         .addFields({name: `<:stardev_book:1164362461181399111> **Sistemdeki Link Sayısı**`, value: `**\`${db.fetch(`UptimeLink`).length}\`**`})
         .addFields({name: `<:stardev_link:1164353637552766987> **Kullanıcının Link Sayısı**`, value: `**\`${db.fetch(`UptimeLink_${interaction.user.id}`).length}\`**`})
         .addFields({name: `<:stardev_link2:1164366935044137060> **Kullanıcının Eklediği Link**`, value: `**${link}**`})
         client.channels.cache.find(x => x.name == "uptime-log").send({embeds: [ProjeEklendi]})
        
      })  
   }
}